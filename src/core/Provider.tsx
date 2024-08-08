import * as React from 'react';
import { IResolver, MethodInvokeEvent, ResolverKey } from '../types';
import { patchViewModel } from './patchViewModel';
import { Provider as ContextProvider } from './reactContext';
import { ViewRefresher } from './viewRefresher';
import { VmContext } from './vmContext';
import { VmMetadata } from './vmMetadata';

//
// Here we wrap the actual React context provider with our own Provider
// component so that we can add some custom logic to it.
//

export interface ProviderProps {
    resolver: IResolver;
    onMethodInvokeStart?: (e: MethodInvokeEvent) => void;
    onMethodInvokeEnd?: (e: MethodInvokeEvent) => void;
    children?: React.ReactNode;
}

export class Provider extends React.PureComponent<ProviderProps> {

    private readonly viewRefresher: ViewRefresher;

    constructor(props: ProviderProps) {
        super(props);

        this.resolve = this.resolve.bind(this);

        const refreshSelf = this.forceUpdate.bind(this);
        this.viewRefresher = new ViewRefresher(refreshSelf);
    }

    public render() {
        return (
            <ContextProvider value={{ resolve: this.resolve }}>
                {this.props.children}
            </ContextProvider>
        );
    }

    private resolve<T>(key: ResolverKey<T>): T {
        if (!this.props.resolver)
            throw new Error('No resolver provided');

        const vm = this.props.resolver.get(key);
        const vmMeta = VmMetadata.get(vm);

        // Not a ViewModel
        if (!vmMeta) {
            return vm;
        }

        // Already patched
        const vmContext = VmContext.get(vm);
        if (vmContext) {
            return vm;
        }

        // Patch new ViewModel instance
        patchViewModel({
            vm: vm,
            vmMeta: vmMeta,
            viewRefresher: this.viewRefresher,
            onMethodInvokeStart: this.props.onMethodInvokeStart,
            onMethodInvokeEnd: this.props.onMethodInvokeEnd
        });
        return vm;
    }
}
