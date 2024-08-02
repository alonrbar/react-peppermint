import * as React from 'react';
import { internalContext } from './internalContext';
import { ViewModelLifeCycle } from './viewModelLifecycle';
import { ResolverKey } from '../types';

export const useViewModel = (VmClass: ResolverKey<any>) => {
    const context = React.useContext(internalContext);
    const vmLifeCycle = new ViewModelLifeCycle(VmClass);

    // componentDidMount and componentWillUnmount
    // https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once#56767883
    // https://stackoverflow.com/questions/53464595/how-to-use-componentwillmount-in-react-hooks#53465182
    React.useEffect(() => {
        vmLifeCycle.activate();
        return function onUnmount() {
            vmLifeCycle.deactivate();
        }
    }, []);

    // on each render
    vmLifeCycle.init(context, ...);

    return vmLifeCycle;
}

