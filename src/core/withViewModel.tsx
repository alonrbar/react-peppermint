import * as React from 'react';
import { ResolverKey } from '../types';
import { assignWithProperties } from '../utils';
import { InternalConsumer } from './internalContext';
import { ViewModelLifeCycle } from './viewModelLifeCycle';

// tslint:disable:variable-name

export const withViewModel = (VmClass: ResolverKey<any>) => (Component: React.ComponentType) => {

    class ComponentWithViewModel extends React.PureComponent {

        private readonly vmLifeCycle = new ViewModelLifeCycle(VmClass);

        public componentDidMount() {
            this.vmLifeCycle.activate();
        }

        public componentWillUnmount() {
            this.vmLifeCycle.deactivate();
        }

        public render() {
            return (
                <InternalConsumer>
                    {context => {
                        this.vmLifeCycle.init(context, this);
                        const componentProps = assignWithProperties({}, this.vmLifeCycle.viewModel, this.props);
                        return <Component {...componentProps} />;
                    }}
                </InternalConsumer>
            );
        }
    }

    // set HOC display name
    const originalDisplayName = Component.displayName || Component.name || 'Component';
    (ComponentWithViewModel as React.ComponentType).displayName = `WithViewModel(${originalDisplayName})`;
    return ComponentWithViewModel;
};
