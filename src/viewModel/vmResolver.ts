import { ViewModelClassInfo, ViewModelInstanceInfo } from '../info';
import { IResolver, RefreshCallback, ResolverKey } from '../types';
import { getMethods } from '../utils';

export class VmResolver implements IResolver {

    public readonly internalResolver: IResolver;
    private readonly refreshAll: RefreshCallback;

    constructor(internalContainer: IResolver, refreshAll: RefreshCallback) {
        this.internalResolver = internalContainer;
        this.refreshAll = refreshAll;
    }

    public get<T>(key: ResolverKey<T>): T {
        const instance = this.internalResolver.get(key);

        const vmInfo = ViewModelClassInfo.getInfo(instance);
        if (vmInfo) {
            this.patchViewModel(instance, vmInfo);
        }

        return instance;
    }

    private patchViewModel(vm: any, vmClassInfo: ViewModelClassInfo) {
        const self = this;  // tslint:disable-line:no-this-assignment

        // set vm symbols
        const vmInstanceInfo = ViewModelInstanceInfo.initInfo(vm);

        // patch methods        
        const vmMethods = getMethods(vm);
        for (const methodName of Object.keys(vmMethods)) {

            // bind vm methods to itself
            const originalMethod: Function = vm[methodName].bind(vm); // tslint:disable-line:ban-types
            vm[methodName] = originalMethod;

            // patch actions
            const isAction = vmClassInfo.refresh[methodName];
            const isBroadcast = vmClassInfo.refreshAll[methodName];

            if (isAction || isBroadcast) {                
                vm[methodName] = function () {

                    // call the original method
                    const result = originalMethod.apply(this, arguments);

                    // refresh views
                    if (isAction) {
                        vmInstanceInfo.refreshView.forEach(refresh => refresh());
                    } else if (isBroadcast) {
                        self.refreshAll();
                    }

                    // return original result
                    return result;
                };
            }
        }
    }
}