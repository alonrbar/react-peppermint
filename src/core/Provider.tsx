import * as React from 'react';
import { IResolver, MethodInvokeEvent } from '../types';
import { Provider as ContextProvider  } from './reactContext';
import { VmResolver } from './vmResolver';

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

    private vmResolver: VmResolver;

    public render() {

        // init the resolver
        this.setResolver();

        // delegate rest of work to React's Provider
        return (
            <ContextProvider value={{ resolver: this.vmResolver }}>
                {this.props.children}
            </ContextProvider>
        );
    }

    private setResolver() {

        // can't set resolver
        if (!this.props.resolver)
            return;

        // resolver already exists
        if (this.vmResolver && this.vmResolver.internalResolver === this.props.resolver) {
            return;
        }

        // create (or update) resolver
        this.vmResolver = new VmResolver(this.props.resolver, this);
        this.vmResolver.onMethodInvokeStart = this.props.onMethodInvokeStart;
        this.vmResolver.onMethodInvokeEnd = this.props.onMethodInvokeEnd;
    }
}
