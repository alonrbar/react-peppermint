import { act, render } from '@testing-library/react';
import * as React from 'react';
import { action, IResolver, Provider, useViewModel, withViewModel } from 'src';

describe('End to end', () => {

    class CounterViewModel {
        public count = 0;

        @action
        public increment() {
            this.count++;
        }

        public reset() {
            this.count = 0;
        }
    }

    const vm = new CounterViewModel();

    const simpleResolver: IResolver = {
        get: () => {
            return vm as any;
        }
    };

    beforeEach(() => {
        vm.reset();
    });

    test('Class component withViewModel', () => {

        // Define a class component
        class TestComponent extends React.Component<{ count: number }> {
            render() {
                return <div>Count: {this.props.count}</div>
            }
        }

        // Bind the view model to the component
        const BoundTestComponent = withViewModel(CounterViewModel)(TestComponent);

        // Render
        const ui = render(
            <Provider resolver={simpleResolver}>
                <BoundTestComponent />
            </Provider>
        )
        ui.getByText('Count: 0');

        // Update state
        act(() => {
            vm.increment();
        });

        // Verify UI updated
        ui.getByText('Count: 1');

        // Update state again
        act(() => {
            vm.increment();
        });

        // Verify UI updated
        ui.getByText('Count: 2');
    });

    test('Functional component withViewModel', () => {

        // Define a functional component
        const TestComponent = (props: { count: number }) => {
            return <div>Count: {props.count}</div>
        }

        // Bind the view model to the component
        const BoundTestComponent = withViewModel(CounterViewModel)(TestComponent);

        // Render
        const ui = render(
            <Provider resolver={simpleResolver}>
                <BoundTestComponent />
            </Provider>
        )
        ui.getByText('Count: 0');

        // Update state
        act(() => {
            vm.increment();
        });

        // Verify UI updated
        ui.getByText('Count: 1');

        // Update state again
        act(() => {
            vm.increment();
        });

        // Verify UI updated
        ui.getByText('Count: 2');
    });

    test('Functional component with useViewModel', () => {

        // Define a functional component
        const TestComponent = () => {
            const vm = useViewModel(CounterViewModel);
            return <div>Count: {vm.count}</div>
        }

        // Render
        const ui = render(
            <Provider resolver={simpleResolver}>
                <TestComponent />
            </Provider>
        )
        ui.getByText('Count: 0');

        // Update state
        act(() => {
            vm.increment();
        });

        // Verify UI updated
        ui.getByText('Count: 1');

        // Update state again
        act(() => {
            vm.increment();
        });

        // Verify UI updated
        ui.getByText('Count: 2');
    });
});
