# react-peppermint

Keep your view fresh 🌿 with React Peppermint - a light weight view-model library for React and TypeScript.

**Notice: This library is still in it's _alpha version_.**  
**New version are coming in the next weeks, stay tuned :)**

[Change Log](https://github.com/alonrbar/react-peppermint/blob/master/CHANGELOG.md)

## Installation

```shell
yarn add react-peppermint
```

or

```shell
npm install --save react-peppermint
```

## Short Example

```javascript

// -------------------------
// appVm.ts
//
// declare your view-model
// -------------------------

import { refresh, viewModel } from 'react-peppermint';

@viewModel
class AppVm {

    public someValue = 'some value';

    @refresh
    public updateValue(val: string): void {

        // THIS IS THE PART TO NOTE:
        // See the @refresh decorator?
        // Using it means that every call to this method will 
        // automatically refresh the view!

        this.someValue = val;
    }
}


// -------------------------
// App.tsx
//
// connect the view-model to a React component
// -------------------------

import * as React from 'react';
import { withViewModel } from 'react-peppermint';
import { AppVm } from './appVm';

export interface AppProps {
    someValue: string;
    updateValue: (val: string) => void;
}

class App extends React.Component<AppProps> {   // Note: You don't even need to
                                                // declare the props, you can use
                                                // AppVm as a type directly if 
                                                // you want.
    public render() {
        return (
            <div>
                <h1>{this.props.someValue}</h1>
                <button onClick={() => this.props.updateValue('new value')}>
                    Change value
                </button>
            </div>
        );
    }
}

// notice the use of the 'withViewModel' HOC here
export const AppWithViewModel = withViewModel(AppVm)(App);
```

## The Secret Sauce

To connect the view and the view-model we use React's new context API, much similar to the way react-redux works. Instead of a **store** we use a dependency injection **container** (React Peppermint is not tied to any specific container, use poor man's DI or your container of choice).

```javascript

// -------------------------
// resolver.js
//
// configure the container
// -------------------------

import { IResolver } from 'react-peppermint';
import { AppVm } from './appVm';

// use a simple Map as a container (again, this is a simplified example)
const container = new Map<any, any>();
container.set(AppVm, new AppVm(router));

// implement the IResolver interface
export const resolver: IResolver = {
    get: (key: any) => {
        return container.get(key);
    }
};


// -------------------------
// main.ts
//
// use a Provider in your application root
// -------------------------

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-peppermint';
import { App } from './app';
import { resolver } from './resolver';

ReactDOM.render(
    <Provider resolver={resolver}>
        <App />
    </Provider>,
    document.getElementById('application-root')
);
```