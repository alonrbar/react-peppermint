import * as React from 'react';
import { IResolver, MethodInvokeEvent } from '../types';
import { InternalProvider } from './internalContext';
import { VmResolver } from './vmResolver';

//
// Here we wrap the actual React context provider with our own Provider class so
// that we could execute custom logic during 'render' calls.
//

export interface ProviderProps {
    resolver: IResolver;
    onMethodInvokeStart?: (e: MethodInvokeEvent) => void;
    onMethodInvokeEnd?: (e: MethodInvokeEvent) => void;
}

export class Provider extends React.PureComponent<ProviderProps> {

    private vmResolver: VmResolver;

    public render() {
        this.setContainer();
        return (
            <InternalProvider value={{ resolver: this.vmResolver }}>
                {this.props.children}
            </InternalProvider>
        );
    }

    private setContainer() {

        // can't set container
        if (!this.props.resolver)
            return;

        // container already exists
        if (this.vmResolver && this.vmResolver.internalResolver === this.props.resolver) {
            return;
        }

        // create (or update) container
        this.vmResolver = new VmResolver(this.props.resolver, this);
        this.vmResolver.onMethodInvokeStart = this.props.onMethodInvokeStart;
        this.vmResolver.onMethodInvokeEnd = this.props.onMethodInvokeEnd;
    }
}