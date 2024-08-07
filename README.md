# react-peppermint

Fresh state management for React 🌿

[![ci](https://github.com/alonrbar/react-peppermint/actions/workflows/ci.yaml/badge.svg)](https://github.com/alonrbar/react-peppermint/actions/workflows/ci.yaml)
[![npm version](https://img.shields.io/npm/v/react-peppermint.svg)](https://www.npmjs.com/package/react-peppermint)
[![license](https://img.shields.io/npm/l/react-peppermint.svg)](https://github.com/alonrbar/react-peppermint/blob/master/LICENSE)

- [The gist](#the-gist)
- [Installation](#installation)
- [Provider](#provider)
- [View models](#view-models)
- [Class components](#class-components)
- [Function components](#function-components)
- [Changelog](#changelog)

## The gist

```typescript
import { action, useViewModel, viewModel } from 'react-peppermint';

//
// View model
//

@viewModel
class CounterVm {

    public count = 0;

    @action
    public increment() {
        this.count++;
    }
}

//
// Component
//

function Counter() {
    const vm = useViewModel(CounterVm)
    return (
      <>
        <h1>{vm.count}</h1>
        <button onClick={vm.increment}>
          Increment
        </button>
      </>
    );
}
```

## Installation

```shell
yarn add react-peppermint
```

or

```shell
npm install --save react-peppermint
```

## Provider

React Peppermint includes a `<Provider />` component, which makes the view models available to the rest of your application:

```typescript
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-peppermint';
import App from './app';
import { resolver } from './resolver';

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider resolver={resolver}>
    <App />
  </Provider>
);
```

The provider needs a `Resolver`. The resolver is a [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) container.
React Peppermint is not tied to any specific container, use poor man's DI or your container of choice.  

To keep it simple in this example we
use a standard JavaScript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) as our DI container:

```typescript
import { IResolver } from 'react-peppermint';
import { AppVm } from './appVm';
import { CounterVm } from './counterVm';

const container = new Map();
container.set(AppVm, new AppVm());
container.set(CounterVm, new CounterVm());

// Implement the IResolver interface
export const resolver: IResolver = {
    get: (key: any) => {
        return container.get(key);
    }
};
```

> [!TIP]
> We recommend the excellent [peppermint-di](https://github.com/alonrbar/peppermint-di) container :wink:

## View models

View models hold state and logic to be used by your components.

First, annotate the class with the `viewModel` decorator. Then, add fields and method as usual.

Now, in order for a view-model method to cause a refresh of the component it's connected to, we need to annotate it with a decorator. There are four types of method decorators in React Peppermint:

  1. `action` - This is the basic method decorator. It causes any connected component to re-render when the method is done.
  2. `broadcast` - This decorator will cause _all_ connected components to re-render, whether they are connected to this view model or any other view model.
  3. `activate` - Instructs React Peppermint to invoke this method after the first time the component is mounted (similarly to [componentDidMount](https://react.dev/reference/react/Component#componentdidmount)).
  4. `deactivate` - Instructs React Peppermint to invoke this method right before the component will unmount (similarly to [componentWillUnmount](https://react.dev/reference/react/Component#componentwillunmount)).

```typescript
import { action, activate, deactivate, viewModel } from 'react-peppermint';

@viewModel
class CounterVm {

    public count = 0;

    @activate
    public activate() {
        console.log('Hello!');
    }

    @action
    public increment() {
        this.count++;
    }

    @deactivate
    public activate() {
        console.log('Bye!');
    }
}
```

## Class components

To connect a view model to a class component, use the `withViewModel` high order component (don't worry if you are not familiar with the [HOC](https://legacy.reactjs.org/docs/higher-order-components.html) concept, you can think of it as a simple function).

```typescript
import * as React from 'react';
import { withViewModel } from 'react-peppermint';
import { CounterVm } from './counterVm';

class Counter extends React.Component<CounterVm> {
    public render() {
        return (
            <>
                <h1>{this.props.count}</h1>
                <button onClick={this.props.increment}>
                    Increment
                </button>
            </>
        );
    }
}

// Using the 'withViewModel' HOC here:
export default withViewModel(CounterVm)(Counter);
```

## Function components

You can connect function components to view models by using the `withViewModel` HOC, exactly like it's done with class components. However, higher-order components are not commonly used in modern React code. Instead, hooks are the common way to go.

The **recommended** way to connect a function component to a view model is by using the `useViewModel` hook:

```typescript
import * as React from 'react';
import { useViewModel } from 'react-peppermint';
import { CounterVm } from './counterVm';

export default function Counter() {
    const vm = useViewModel(CounterVm)
    return (
      <>
        <h1>{vm.count}</h1>
        <button onClick={vm.increment}>
          Increment
        </button>
      </>
    );
}
```

## Changelog

The changelog can be found [here](https://github.com/alonrbar/react-peppermint/blob/master/CHANGELOG.md).
