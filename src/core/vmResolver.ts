import { createMethodInvokeArgs, IResolver, Method, MethodInvokeEvent, ResolverKey } from '../types';
import { defineProperties, DescriptorType, getMethods, isPromise, tryInvoke } from '../utils';
import { ViewRefresher } from './viewRefresher';
import { VmClassInfo } from './vmClassInfo';
import { VmContext } from './vmContext';

/**
 * Augments and resolves view-models.
 */
export class VmResolver implements IResolver {

    public onMethodInvokeStart: (e: MethodInvokeEvent) => void;
    public onMethodInvokeEnd: (e: MethodInvokeEvent) => void;

    public readonly internalResolver: IResolver;

    private readonly viewRefresher: ViewRefresher;

    constructor(internalContainer: IResolver, rootComponent: React.Component) {
        this.internalResolver = internalContainer;
        this.viewRefresher = new ViewRefresher(rootComponent);
    }

    public get<T>(key: ResolverKey<T>): T {
        const instance = this.internalResolver.get(key);

        // if it's a vm class
        const vmClassInfo = VmClassInfo.getInfo(instance);
        if (vmClassInfo) {

            // and the current instance is not already patched
            const vmInstanceInfo = VmContext.getContext(instance);
            if (!vmInstanceInfo) {

                // patch current vm instance
                this.patchViewModel(instance, vmClassInfo);
            }
        }

        return instance;
    }

    private patchViewModel(vm: any, vmClassInfo: VmClassInfo): void {

        // set vm symbols
        VmContext.initContext(vm, vmClassInfo, this.viewRefresher);

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
            this.patchMethod(vm, vmClassInfo, methodName);
        }
    }

    private patchMethod(vm: any, vmClassInfo: VmClassInfo, methodName: string): void {

        const self = this;  // tslint:disable-line:no-this-assignment
        const originalMethod: Method = vm[methodName];
        const actionOptions = vmClassInfo.actions[methodName];
        const broadcastOptions = vmClassInfo.broadcasts[methodName];
        const activateOptions = vmClassInfo.activate[methodName];
        const deactivateOptions = vmClassInfo.deactivate[methodName];
        const anyOptions = (actionOptions || broadcastOptions || activateOptions || deactivateOptions);
        const shouldPatch = !!anyOptions;

        let finalMethod: Method;
        if (shouldPatch) {

            // patch actions and broadcasts
            finalMethod = function (this: any) {

                const args = arguments;
                const isBroadcast = !!broadcastOptions;

                // notify before
                const invokeEventArgs = createMethodInvokeArgs(vm, methodName, args, isBroadcast);
                tryInvoke(self.onMethodInvokeStart, invokeEventArgs);

                // call the original method
                const result = originalMethod.apply(this, args);

                const afterOriginalInvoked = (res: any) => {

                    // refresh view
                    if (!deactivateOptions) {
                        self.viewRefresher.refreshViews(isBroadcast, vm);
                    }

                    // notify
                    tryInvoke(self.onMethodInvokeEnd, invokeEventArgs);
                    return res;
                };

                // return
                if (isPromise(result) && !anyOptions.immediate) {
                    return result.then(afterOriginalInvoked);
                } else {
                    return afterOriginalInvoked(result);
                }
            };

        } else {

            // keep other methods untouched
            finalMethod = originalMethod;
        }

        // bind all vm methods to itself
        vm[methodName] = finalMethod.bind(vm);
    }
}