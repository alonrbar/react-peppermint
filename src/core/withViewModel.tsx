import * as React from 'react';
import { ResolverKey } from '../types';
import { assignWithProperties } from '../utils';
import { Consumer } from './reactContext';
import { VmContext } from './vmContext';

export type OmitProps<T, K> = Pick<T, Exclude<keyof T, keyof K>>;

export type ComponentEnhancer<TInjectedProps> = <TRequiredProps>(Component: React.ComponentType<TRequiredProps>) => React.ComponentClass<OmitProps<TRequiredProps, TInjectedProps>>;

export function withViewModel<TVm = {}>(VmClass: ResolverKey<TVm>): ComponentEnhancer<TVm> {

    return function <TProps>(Component: React.ComponentType<TProps>) {

        class ComponentWithViewModel extends React.PureComponent<OmitProps<TProps, TVm>> {

            private readonly refreshView = this.forceUpdate.bind(this);

            private vmContext: VmContext;

            public componentDidMount() {
                this.vmContext?.activate();
            }

            public componentWillUnmount() {
                this.vmContext?.deactivate(this.refreshView);
            }

            public render() {
                return (
                    <Consumer>
                        {ctx => {
                            if (!this.vmContext) {
                                this.vmContext = VmContext.registerView(this.refreshView, ctx, VmClass);
                            }
                            const componentProps: any = assignWithProperties({}, this.vmContext?.vm, this.props);
                            return <Component {...componentProps} />;
                        }}
                    </Consumer>
                );
            }
        }

        // set HOC display name
        const originalDisplayName = Component.displayName || Component.name || 'Component';
        (ComponentWithViewModel as React.ComponentType).displayName = `WithViewModel(${originalDisplayName})`;
        return ComponentWithViewModel;
    };
}
