import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ResolverKey } from '../types';
import { ReactPeppermintContext } from './reactContext';
import { VmContext } from './vmContext';

export function useViewModel<T>(VmClass: ResolverKey<T>): T {
    const context = useContext(ReactPeppermintContext);

    // Force update callback.
    // https://blog.logrocket.com/how-when-to-force-react-component-re-render/#forcing-update-function-component
    const [, updateRefreshState] = useState<any>();
    const forceUpdate = useCallback(() => updateRefreshState({}), []);

    // Register the view and get the view model.
    // https://react.dev/reference/react/useRef#how-to-avoid-null-checks-when-initializing-use-ref-later
    const vmContextRef = useRef<VmContext>(null);
    function getVmContext() {
        if (vmContextRef.current) {
            return vmContextRef.current;
        }

        const vmContext = VmContext.registerView(forceUpdate, context, VmClass);
        vmContextRef.current = vmContext;
        return vmContext;
    }
    const vmContext = getVmContext();

    // componentDidMount and componentWillUnmount
    // https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once#56767883
    // https://stackoverflow.com/questions/53464595/how-to-use-componentwillmount-in-react-hooks#53465182
    useEffect(() => {
        vmContext.activate();
        return function onUnmount() {
            vmContext.deactivate(forceUpdate);
        };
    }, []);

    return vmContext.vm;
}

