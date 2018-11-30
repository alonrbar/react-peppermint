import * as React from 'react';
import { ResolverKey } from '../types';
import { InternalConsumer, InternalContext } from './internalContext';
import { VmContext } from './vmContext';

// tslint:disable:variable-name

export const withViewModel = (VmClass: ResolverKey<any>) => (Component: React.ComponentType) => {

    class ComponentWithViewModel extends React.PureComponent {

        //
        // properties
        //

        private vm: any;

        //
        // life cycle methods
        //

        public componentDidMount() {
            this.activate();
        }

        public render() {
            return (
                <InternalConsumer>
                    {context => {
                        this.init(context);
                        const componentProps = Object.assign({}, this.vm, this.props);
                        return <Component {...componentProps} />;
                    }}
                </InternalConsumer>
            );
        }

        public componentWillUnmount() {
            this.deactivate();
        }

        //
        // private methods
        //

        private init(context: InternalContext) {

            // init only once
            if (this.vm)
                return;

            if (!context)
                throw new Error('Context not found. Make sure you use the Provider component.');
            if (!context.resolver)
                throw new Error('Resolver not found. Make sure you use the Provider component.');

            // resolve vm instance
            this.vm = context.resolver.get(VmClass);

            // register for updates
            const vmInfo = VmContext.getContext(this.vm);
            if (!vmInfo)
                throw new Error(`Class ${this.vm.constructor.name} is used as a view-model but no decorator was used.`);
            vmInfo.registerView(this);
        }

        private activate() {
            const vmContext = VmContext.getContext(this.vm);
            this.invokeMethod(vmContext.activateKey);
        }

        private deactivate() {
            const vmContext = VmContext.getContext(this.vm);
            this.invokeMethod(vmContext.deactivateKey);
        }

        private invokeMethod(methodName: string | symbol) {
            if (!methodName)
                return;

            const method = this.vm[methodName];
            if (typeof method !== 'function')
                return;

            method();
        }
    }

    // set HOC display name
    const originalDisplayName = Component.displayName || Component.name || 'Component';
    (ComponentWithViewModel as React.ComponentType).displayName = `WithViewModel(${originalDisplayName})`;
    return ComponentWithViewModel;
};