import * as React from 'react';
import { ResolverKey } from '../types';
import { assignWithProperties } from '../utils';
import { Consumer } from './reactContext';
import { ViewModelLifeCycle } from './viewModelLifeCycle';

export type OmitProps<T, K> = Pick<T, Exclude<keyof T, keyof K>>;

export type ComponentEnhancer<TInjectedProps> = <TRequiredProps>(Component: React.ComponentType<TRequiredProps>) => React.ComponentClass<OmitProps<TRequiredProps, TInjectedProps>>;

export function withViewModel<TVm = {}>(VmClass: ResolverKey<TVm>): ComponentEnhancer<TVm> {

    return function <TProps>(Component: React.ComponentType<TProps>) {

        class ComponentWithViewModel extends React.PureComponent<OmitProps<TProps, TVm>> {

            private readonly vmLifeCycle = new ViewModelLifeCycle(VmClass);

            public componentDidMount() {
                this.vmLifeCycle.activate();
            }

            public componentWillUnmount() {
                this.vmLifeCycle.deactivate();
            }

            public render() {
                return (
                    <Consumer>
                        {context => {
                            this.vmLifeCycle.init(context, this);
                            const componentProps: any = assignWithProperties({}, this.vmLifeCycle.viewModel, this.props);
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
