# react-peppermint

Keep your view fresh 🌿 with React Peppermint - a light weight view-model library for React. Written in TypeScript.

[Change Log](https://github.com/alonrbar/react-peppermint/blob/master/CHANGELOG.md)

## Installation

```shell
yarn add react-peppermint
```

or

```shell
npm install --save react-peppermint
```

## Example

**appVm.ts** - declare your view-model

```javascript
import { action, viewModel } from 'react-peppermint';

@viewModel
class AppVm {

    public someValue = 'some value';

    @action
    public updateValue(val: string): void {

        // THIS IS THE PART TO NOTE:
        // See the @action decorator?
        // Using it means that every call to this method will 
        // automatically refresh the view!

        this.someValue = val;
    }
}
```

**App.tsx** - connect the view-model to a React component

```javascript
import * as React from 'react';
import { withViewModel } from 'react-peppermint';
import { AppVm } from './appVm';

export interface AppProps {
    someValue: string;
    updateValue: (val: string) => void;
}

class App extends React.Component<AppProps> {   // Note: You don't even need to
                                                // declare the AppProps interface,  
                                                // you can use AppVm as the props 
                                                // type directly if you prefer.
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

**main.ts** - use a Provider in your application root

To connect the view and the view-model we use React's new context API, much similar to the way react-redux works. Instead of a **store** we use a dependency injection **container** (React Peppermint is not tied to any specific container, use poor man's DI or your container of choice).

```javascript
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

**resolver.ts** - configure the DI container

```javascript
import { IResolver } from 'react-peppermint';
import { AppVm } from './appVm';

// use a simple Map as a container (again, this is a simplified example)
const container = new Map<any, any>();
container.set(AppVm, new AppVm());

// implement the IResolver interface
export const resolver: IResolver = {
    get: (key: any) => {
        return container.get(key);
    }
};
```