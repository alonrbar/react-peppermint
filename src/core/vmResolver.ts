import { ViewModelClassInfo, ViewModelInstanceInfo } from '../info';
import { IResolver, Method, MethodInvokedEvent, RefreshCallback, ResolverKey } from '../types';
import { defineProperties, DescriptorType, getMethods, isPromise } from '../utils';

export class VmResolver implements IResolver {

    public onMethodInvoked: (e: MethodInvokedEvent) => void;

    public readonly internalResolver: IResolver;
    private readonly refreshAll: RefreshCallback;

    constructor(internalContainer: IResolver, refreshAll: RefreshCallback) {
        this.internalResolver = internalContainer;
        this.refreshAll = refreshAll;
    }

    public get<T>(key: ResolverKey<T>): T {
        const instance = this.internalResolver.get(key);

        // if it's a vm class
        const vmClassInfo = ViewModelClassInfo.getInfo(instance);
        if (vmClassInfo) {

            // and the current instance is not already patched
            const vmInstanceInfo = ViewModelInstanceInfo.getInfo(instance);
            if (!vmInstanceInfo) {

                // patch current vm instance
                this.patchViewModel(instance, vmClassInfo);
            }
        }

        return instance;
    }

    private patchViewModel(vm: any, vmClassInfo: ViewModelClassInfo) {

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
            this.patchMethod(vm, vmClassInfo, vmInstanceInfo, methodName);
        }
    }

    private patchMethod(vm: any, vmClassInfo: ViewModelClassInfo, vmInstanceInfo: ViewModelInstanceInfo, methodName: string) {

        const self = this;  // tslint:disable-line:no-this-assignment
        const originalMethod: Method = vm[methodName];
        const actionOptions = vmClassInfo.action[methodName];
        const broadcastOptions = vmClassInfo.broadcast[methodName];
        const anyOptions = (actionOptions || broadcastOptions);

        let finalMethod: Method;
        if (anyOptions) {

            // patch actions
            finalMethod = function (this: any) {

                // call the original method
                const result = originalMethod.apply(this, arguments);

                // refresh and return
                if (isPromise(result) && !anyOptions.immediate) {
                    return result.then((resValue: any) => {
                        self.refreshView(!!broadcastOptions, vmInstanceInfo);
                        self.notifyMethodInvoked(vm, methodName);
                        return resValue;
                    });
                } else {
                    self.refreshView(!!broadcastOptions, vmInstanceInfo);
                    self.notifyMethodInvoked(vm, methodName);
                    return result;
                }
            };

        } else {

            // keep other methods untouched
            finalMethod = originalMethod;
        }

        // bind all vm methods to itself
        vm[methodName] = finalMethod.bind(vm);
    }

    private refreshView(refreshAll: boolean, vmInstanceInfo: ViewModelInstanceInfo): void {
        if (refreshAll) {
            this.refreshAll();
        } else {
            vmInstanceInfo.refreshView.forEach(refresh => refresh());
        }
    }

    private notifyMethodInvoked(vm: any, methodName: string): void {
        const handler = this.onMethodInvoked;
        if (handler) {
            handler({
                vm,
                methodName
            });
        }
    }
}