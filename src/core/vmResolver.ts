import { ViewModelClassInfo, ViewModelInstanceInfo } from '../info';
import { IResolver, Method, RefreshCallback, ResolverKey } from '../types';
import { defineProperties, DescriptorType, getMethods } from '../utils';

export class VmResolver implements IResolver {

    public readonly internalResolver: IResolver;
    private readonly refreshAll: RefreshCallback;

    constructor(internalContainer: IResolver, refreshAll: RefreshCallback) {
        this.internalResolver = internalContainer;
        this.refreshAll = refreshAll;
    }

    public get<T>(key: ResolverKey<T>): T {
        const instance = this.internalResolver.get(key);

        const vmInfo = ViewModelClassInfo.getInfo(instance as any);
        if (vmInfo) {
            this.patchViewModel(instance, vmInfo);
        }

        return instance;
    }

    private patchViewModel(vm: any, vmClassInfo: ViewModelClassInfo) {
        const self = this;  // tslint:disable-line:no-this-assignment

        // set vm symbols
        const vmInstanceInfo = ViewModelInstanceInfo.initInfo(vm);
        vmInstanceInfo.activate = vmClassInfo.activate;
        vmInstanceInfo.deactivate = vmClassInfo.deactivate;

        //
        // define methods and properties directly on the vm instance (they
        // currently exist on it's prototype) this way they will also be copied
        // to withViewModel wrapped component (the copy operation happens inside
        // it's render method)
        //

        // define properties "as is"
        defineProperties(vm, vm, [DescriptorType.Property]);

        // patch and define methods
        const vmMethods = getMethods(vm);
        for (const methodName of Object.keys(vmMethods)) {
            this.patchMethod(self, vm, vmClassInfo, vmInstanceInfo, methodName);
        }
    }

    private patchMethod(
        resolver: VmResolver,
        vm: any,
        vmClassInfo: ViewModelClassInfo,
        vmInstanceInfo: ViewModelInstanceInfo,
        methodName: string
    ) {

        const originalMethod: Method = vm[methodName];
        const isAction = vmClassInfo.refresh[methodName];
        const isBroadcast = vmClassInfo.refreshAll[methodName];

        let finalMethod: Method;
        if (isAction || isBroadcast) {

            // patch actions
            const freshWrapper = function (this: any) {
                
                // measure time
                let start: number;
                if (process.env.NODE_ENV === 'development') {
                    start = Date.now();
                }

                // call the original method
                const result = originalMethod.apply(this, arguments);

                // refresh views
                if (isAction) {
                    vmInstanceInfo.refreshView.forEach(refresh => refresh());
                } else if (isBroadcast) {
                    resolver.refreshAll();
                }

                // log
                if (process.env.NODE_ENV === 'development') {
                    const totalTime = Date.now() - start;
                    console.log(`[${vm.constructor.name}] ${methodName} (in ${totalTime}ms)`);
                }

                // return original result
                return result;
            };

            finalMethod = freshWrapper;
        } else {

            // keep other methods untouched
            finalMethod = originalMethod;
        }

        // bind vm methods to itself
        vm[methodName] = finalMethod.bind(vm);
    }
}