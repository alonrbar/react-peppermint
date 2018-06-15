import { ViewModelClassInfo, ViewModelInstanceInfo } from '../info';
import { IResolver, RefreshCallback, ResolverKey } from '../types';
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

        // define properties directly on the vm instance (they currently exist
        // on it's prototype) this way they will also be copied to withViewModel
        // wrapped component (inside it's render method)
        defineProperties(vm, vm, [DescriptorType.Property]);

        // patch methods        
        const vmMethods = getMethods(vm);
        for (const methodName of Object.keys(vmMethods)) {

            const originalMethod: Function = vm[methodName]; // tslint:disable-line:ban-types

            // patch actions
            const isAction = vmClassInfo.refresh[methodName];
            const isBroadcast = vmClassInfo.refreshAll[methodName];

            if (isAction || isBroadcast) {
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
                        self.refreshAll();
                    }

                    // log
                    if (process.env.NODE_ENV === 'development') {
                        const totalTime = Date.now() - start;
                        console.log(`[${vm.constructor.name}] ${methodName} (in ${totalTime}ms)`);
                    }

                    // return original result
                    return result;
                };

                // bind vm methods to itself
                vm[methodName] = freshWrapper.bind(vm);
            } else {

                // bind vm methods to itself
                vm[methodName] = originalMethod.bind(vm);
            }
        }
    }
}