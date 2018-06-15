import * as React from 'react';
import { ViewModelInstanceInfo } from '../info';
import { IResolver, ResolverKey } from '../types';
import { InternalConsumer } from './reactContext';

// tslint:disable:variable-name

export const withViewModel = (VmClass: ResolverKey<any>) => (Component: React.ComponentType) => {

    return class ComponentWithViewModel extends React.PureComponent {

        private vm: any;

        public componentDidMount() {

            // invoke activate life cycle method
            const vmInfo = ViewModelInstanceInfo.getInfo(this.vm);
            const activateKey = vmInfo.activate;
            if (activateKey) {
                const activateMethod = this.vm[activateKey];
                if (typeof activateMethod === 'function') {

                    // log
                    if (process.env.NODE_ENV === 'development') {
                        console.log(`[${this.vm.constructor.name}] activate`);
                    }

                    // invoke
                    activateMethod();
                }
            }
        }

        public render() {
            return (
                <InternalConsumer>
                    {context => {

                        if (!context)
                            throw new Error('Context not found. Make sure you use the Provider component.');
                        if (!context.resolver)
                            throw new Error('Resolver not found. Make sure you use the Provider component.');
                            
                        this.setVm(context.resolver);
                        const componentProps = Object.assign({}, this.vm, this.props);
                        return <Component {...componentProps} />;
                    }}
                </InternalConsumer>
            );
        }

        public componentWillUnmount() {
            
            // remove registration
            const vmInfo = ViewModelInstanceInfo.getInfo(this.vm);
            vmInfo.refreshView.delete(this);

            // invoke deactivate life cycle method
            const deactivateKey = vmInfo.deactivate;
            if (deactivateKey) {
                const deactivateMethod = this.vm[deactivateKey];
                if (typeof deactivateMethod === 'function') {

                    // log
                    if (process.env.NODE_ENV === 'development') {
                        console.log(`[${this.vm.constructor.name}] deactivate`);
                    }

                    // invoke
                    deactivateMethod();
                }
            }
        }

        private setVm(resolver: IResolver) {
            if (this.vm)
                return;

            // resolve vm instance
            this.vm = resolver.get(VmClass);

            // register for updates
            const vmInfo = ViewModelInstanceInfo.getInfo(this.vm);
            if (!vmInfo) {
                throw new Error(`Class ${this.vm.constructor.name} is used as a view-model but no decorator was used.`);
            }

            vmInfo.refreshView.set(this, this.forceUpdate.bind(this));
        }
    };
};