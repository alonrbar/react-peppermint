import * as React from 'react';
import { createMethodInvokeArgs, ResolverKey } from '../types';
import { tryInvoke } from '../utils';
import { InternalConsumer, InternalContext } from './internalContext';
import { VmContext } from './vmContext';

// tslint:disable:variable-name

export const withViewModel = (VmClass: ResolverKey<any>) => (Component: React.ComponentType) => {

    return class ComponentWithViewModel extends React.PureComponent {

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
            this.invokeMethod(vmContext.activateKey, vmContext);
        }

        private deactivate() {
            const vmContext = VmContext.getContext(this.vm);
            this.invokeMethod(vmContext.deactivateKey, vmContext);
        }

        private invokeMethod(methodName: string | symbol, vmContext: VmContext) {
            if (!methodName)
                return;

            const method = this.vm[methodName];
            if (typeof method !== 'function')
                return;

            // notify before
            const invokeEventArgs = createMethodInvokeArgs(this.vm, methodName, [] as any, false);
            tryInvoke(vmContext.onMethodInvokeStart, invokeEventArgs);

            // invoke
            method();

            // notify after
            tryInvoke(vmContext.onMethodInvokeEnd, invokeEventArgs);
        }
    };
};