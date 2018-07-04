import { ViewModelClassInfo, ViewModelInstanceInfo } from '../info';
import { IResolver, Method, MethodInvokeEvent, ResolverKey } from '../types';
import { defineProperties, DescriptorType, getMethods, isPromise, removeOneFromArray } from '../utils';

export class VmResolver implements IResolver {

    public onMethodInvokeStart: (e: MethodInvokeEvent) => void;
    public onMethodInvokeEnd: (e: MethodInvokeEvent) => void;

    public readonly internalResolver: IResolver;
    private readonly viewsByViewModel = new Map<any, Set<React.Component>>();
    private allViews: React.Component[] = [];

    constructor(internalContainer: IResolver, rootComponent: React.Component) {
        this.internalResolver = internalContainer;
        this.allViews.push(rootComponent);
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

    private patchViewModel(vm: any, vmClassInfo: ViewModelClassInfo): void {

        // set vm symbols
        const vmInstanceInfo = ViewModelInstanceInfo.initInfo(vm);
        vmInstanceInfo.activate = vmClassInfo.activate;
        vmInstanceInfo.deactivate = vmClassInfo.deactivate;
        vmInstanceInfo.addView = (view: React.Component) => this.addView(vm, view);
        vmInstanceInfo.removeView = (view: React.Component) => this.removeView(vm, view);

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

    private addView(vm: any, view: React.Component): void {

        // update viewsByViewModel collection
        let components = this.viewsByViewModel.get(vm);
        if (!components) {
            components = new Set();
            this.viewsByViewModel.set(vm, components);
        }
        components.add(view);

        // update allViews collections
        this.allViews.push(view);
    }

    private removeView(vm: any, view: React.Component): void {

        // update viewsByViewModel collection
        const components = this.viewsByViewModel.get(vm);
        components.delete(view);
        if (!components.size)
            this.viewsByViewModel.delete(vm);

        // update allViews collections
        removeOneFromArray(this.allViews, view);
    }

    private patchMethod(vm: any, vmClassInfo: ViewModelClassInfo, methodName: string): void {

        const self = this;  // tslint:disable-line:no-this-assignment
        const originalMethod: Method = vm[methodName];
        const actionOptions = vmClassInfo.action[methodName];
        const broadcastOptions = vmClassInfo.broadcast[methodName];
        const anyOptions = (actionOptions || broadcastOptions);

        let finalMethod: Method;
        if (anyOptions) {

            // patch actions
            finalMethod = function (this: any) {

                const args = arguments;
                const isBroadcast = !!broadcastOptions;

                // notify before
                self.notifyMethodInvokeStart(vm, methodName, args, isBroadcast);

                // call the original method
                const result = originalMethod.apply(this, args);

                // refresh, notify after and return
                if (isPromise(result) && !anyOptions.immediate) {
                    return result.then((resValue: any) => {
                        self.refreshView(isBroadcast, vm);
                        self.notifyMethodInvokeEnd(vm, methodName, args, isBroadcast);
                        return resValue;
                    });
                } else {
                    self.refreshView(isBroadcast, vm);
                    self.notifyMethodInvokeEnd(vm, methodName, args, isBroadcast);
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

    private refreshView(refreshAll: boolean, vm: any): void {
        let views: React.Component[] | Set<React.Component>;

        if (refreshAll) {
            views = this.allViews.slice();
        } else {
            views = this.viewsByViewModel.get(vm);
        }

        if (views) {
            (views as React.Component[]).forEach(component => {
                // Note that we're updating the wrapping ComponentWithViewModel
                // component, the actual component may not be updated at all
                // (depending on it's shouldComponentUpdate result). That's why
                // we can use forceUpdate instead of setState and spare the
                // implicit shouldComponentUpdate on the wrapping component.
                component.forceUpdate();
            });
        }
    }

    private notifyMethodInvokeStart(vm: any, methodName: string, methodArgs: IArguments, isBroadcast: boolean): void {
        const handler = this.onMethodInvokeStart;
        if (handler) {
            handler({
                vm,
                methodName,
                methodArgs,
                isBroadcast
            });
        }
    }

    private notifyMethodInvokeEnd(vm: any, methodName: string, methodArgs: IArguments, isBroadcast: boolean): void {
        const handler = this.onMethodInvokeEnd;
        if (handler) {
            handler({
                vm,
                methodName,
                methodArgs,
                isBroadcast
            });
        }
    }
}