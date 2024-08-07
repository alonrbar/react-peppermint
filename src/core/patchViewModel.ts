import { defineProperties, DescriptorType, getMethods, isPromise, tryInvoke } from 'src/utils';
import { VmContext } from './vmContext';
import { VmMetadata } from './vmMetadata';
import { ViewRefresher } from './viewRefresher';
import { createMethodInvokeArgs, Method, MethodInvokeEvent } from 'src/types';

export interface PatchParams {
    vm: any;
    vmMeta: VmMetadata;
    viewRefresher: ViewRefresher;
    onMethodInvokeStart: (e: MethodInvokeEvent) => void;
    onMethodInvokeEnd: (e: MethodInvokeEvent) => void;
}

export function patchViewModel(params: PatchParams): void {

    // Set vm symbols
    VmContext.initContext(params.vm, params.vmMeta, params.viewRefresher);

    //
    // Define methods and properties directly on the vm instance. This will
    // cause any invocation of the vm methods to use our patched methods instead
    // of the original ones, which are defined on the prototype chain.
    //

    // Define properties "as is"
    defineProperties(params.vm, params.vm, [DescriptorType.Property]);

    // Patch and define methods
    const vmMethods = getMethods(params.vm);
    for (const methodName of Object.keys(vmMethods)) {
        patchMethod(methodName, params);
    }
}

function patchMethod(methodName: string, params: PatchParams): void {

    const originalMethod: Method = params.vm[methodName];
    const actionOptions = params.vmMeta.actions[methodName];
    const broadcastOptions = params.vmMeta.broadcasts[methodName];
    const activateOptions = params.vmMeta.activate[methodName];
    const deactivateOptions = params.vmMeta.deactivate[methodName];
    const anyOptions = (actionOptions || broadcastOptions || activateOptions || deactivateOptions);
    const shouldPatch = !!anyOptions;

    // Regular methods
    if (!shouldPatch) {
        bindMethod(params.vm, methodName, originalMethod);
        return;
    }

    // Actions and broadcasts
    bindMethod(params.vm, methodName, function (this: any) {

        // eslint-disable-next-line prefer-rest-params
        const args = arguments;
        const isBroadcast = !!broadcastOptions;

        // Notify before
        const invokeEventArgs = createMethodInvokeArgs(params.vm, methodName, args, isBroadcast);
        tryInvoke(params.onMethodInvokeStart, invokeEventArgs);

        // Call the original method
        const result = originalMethod.apply(this, args);

        const afterOriginalInvoked = (res: any) => {

            // Refresh view
            if (!deactivateOptions) {
                params.viewRefresher.refreshViews(isBroadcast, params.vm);
            }

            // Notify
            tryInvoke(params.onMethodInvokeEnd, invokeEventArgs);
            return res;
        };

        // Return
        if (isPromise(result) && !anyOptions.immediate) {
            return result.then(afterOriginalInvoked);
        } else {
            return afterOriginalInvoked(result);
        }
    });
}

function bindMethod(vm: any, methodName: string, method: Method): void {
    vm[methodName] = method.bind(vm);
}
