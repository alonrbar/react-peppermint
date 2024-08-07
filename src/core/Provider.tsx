import * as React from 'react';
import { IResolver, MethodInvokeEvent } from '../types';
import { Provider as ContextProvider  } from './reactContext';
import { VmContainer } from './vmContainer';

//
// Here we wrap the actual React context provider with our own Provider class so
// that we could execute custom logic during 'render' calls.
//

export interface ProviderProps {
    resolver: IResolver;
    onMethodInvokeStart?: (e: MethodInvokeEvent) => void;
    onMethodInvokeEnd?: (e: MethodInvokeEvent) => void;
    children?: React.ReactNode;
}

export class Provider extends React.PureComponent<ProviderProps> {

    private readonly refreshView = this.forceUpdate.bind(this);

    private vmContainer: VmContainer;

    public render() {

        // Init the VM container
        this.setVmContainer();

        // Delegate rest of work to React's Provider
        return (
            <ContextProvider value={{ vmContainer: this.vmContainer }}>
                {this.props.children}
            </ContextProvider>
        );
    }

    private setVmContainer() {

        // Missing DI container
        if (!this.props.resolver)
            return;

        // VM container already exists
        if (this.vmContainer && this.vmContainer.internalContainer === this.props.resolver) {
            return;
        }

        // Create (or update) VM container
        this.vmContainer = new VmContainer(this.props.resolver, this.refreshView);
        this.vmContainer.onMethodInvokeStart = this.props.onMethodInvokeStart;
        this.vmContainer.onMethodInvokeEnd = this.props.onMethodInvokeEnd;
    }
}
