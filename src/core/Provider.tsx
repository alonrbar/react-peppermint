import * as React from 'react';
import { IResolver } from '../types';
import { InternalProvider } from './reactContext';
import { VmResolver } from './vmResolver';

export interface ProviderProps {
    resolver: IResolver;
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
        this.vmResolver = new VmResolver(this.props.resolver, this.forceUpdate.bind(this));
    }
}