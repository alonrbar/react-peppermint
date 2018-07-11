import * as React from 'react';
import { ViewModelInstanceInfo } from '../info';
import { MethodInvokeEvent, ResolverKey } from '../types';
import { InternalConsumer, InternalContext } from './internalContext';

// tslint:disable:variable-name

export const withViewModel = (VmClass: ResolverKey<any>) => (Component: React.ComponentType) => {

    return class ComponentWithViewModel extends React.PureComponent {

        //
        // properties
        //

        private vm: any;
        private onMethodInvokeStart: (e: MethodInvokeEvent) => void;
        private onMethodInvokeEnd: (e: MethodInvokeEvent) => void;

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

            // set internal vars
            this.onMethodInvokeStart = context.onMethodInvokeStart;
            this.onMethodInvokeEnd = context.onMethodInvokeEnd;

            // register for updates
            const vmInfo = ViewModelInstanceInfo.getInfo(this.vm);
            if (!vmInfo)
                throw new Error(`Class ${this.vm.constructor.name} is used as a view-model but no decorator was used.`);
            vmInfo.addView(this);
        }

        private activate() {

            // invoke activate life cycle method
            const vmInfo = ViewModelInstanceInfo.getInfo(this.vm);
            const activateKey = vmInfo.activate;
            if (activateKey) {
                const activateMethod = this.vm[activateKey];
                if (typeof activateMethod === 'function') {

                    // notify before
                    this.notifyMethodInvokeStart(this.vm, activateKey);

                    // invoke
                    activateMethod();

                    // notify after
                    this.notifyMethodInvokeEnd(this.vm, activateKey);
                }
            }
        }

        private deactivate() {

            // remove registration
            const vmInfo = ViewModelInstanceInfo.getInfo(this.vm);
            vmInfo.removeView(this);

            // invoke deactivate life cycle method
            const deactivateKey = vmInfo.deactivate;
            if (deactivateKey) {
                const deactivateMethod = this.vm[deactivateKey];
                if (typeof deactivateMethod === 'function') {

                    // notify before
                    this.notifyMethodInvokeStart(this.vm, deactivateKey);

                    // invoke
                    deactivateMethod();

                    // notify after
                    this.notifyMethodInvokeEnd(this.vm, deactivateKey);
                }
            }
        }

        private notifyMethodInvokeStart(vm: any, methodName: string | symbol, methodArgs?: IArguments, isBroadcast = false): void {
            const handler = this.onMethodInvokeStart;
            if (handler) {
                handler({
                    vm,
                    methodName,
                    methodArgs,
                    isBroadcast
                });
            }
        }
    
        private notifyMethodInvokeEnd(vm: any, methodName: string | symbol, methodArgs?: IArguments, isBroadcast = false): void {
            const handler = this.onMethodInvokeEnd;
            if (handler) {
                handler({
                    vm,
                    methodName,
                    methodArgs,
                    isBroadcast
                });
            }
        }
    };
};