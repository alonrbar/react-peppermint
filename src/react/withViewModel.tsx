import * as React from 'react';
import { ViewModelInstanceInfo } from '../info';
import { IResolver, ResolverKey } from '../types';
import { InternalConsumer } from './reactContext';

// tslint:disable:variable-name

export const withViewModel = (VmClass: ResolverKey<any>) => (Component: React.ComponentType) => {

    return class ComponentWithViewModel extends React.PureComponent {

        private vm: any;

        public render() {
            return (
                <InternalConsumer>
                    {context => {
                        this.setVm(context.resolver);
                        return <Component {...this.vm} {...this.props} />;
                    }}
                </InternalConsumer>
            );
        }

        public componentWillUnmount() {
            // remove registration
            const vmInfo = ViewModelInstanceInfo.getInfo(this.vm);
            vmInfo.refreshView.delete(this);
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