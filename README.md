# react-peppermint

Keep your view fresh 🌿 with React Peppermint - a lightweight view-model library for React. Written in TypeScript.

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
        // automatically refresh the view when it returns.

        this.someValue = val;
    }
}
```

**App.tsx** - connect the view-model to a React component

```javascript
import * as React from 'react';
import { withViewModel } from 'react-peppermint';
import { AppVm } from './appVm';

class App extends React.Component<AppVm> {
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
export default withViewModel(AppVm)(App);
```

**main.ts** - use a Provider in your application root

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-peppermint';
import App from './app';
import { resolver } from './resolver';

ReactDOM.render(
    <Provider resolver={resolver}>
        <App />
    </Provider>,
    document.getElementById('application-root')
);
```

**resolver.ts** - configure the resolver

The resolver is in fact a [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) container.
React Peppermint is not tied to any specific container, use poor man's DI or your container of choice.  
We recommend the excellent [peppermint-di](https://github.com/alonrbar/peppermint-di) container :)

```javascript
import { IResolver } from 'react-peppermint';
import { AppVm } from './appVm';

// to keep it simple in this example we
// use a Map as our DI container
const container = new Map<any, any>();
container.set(AppVm, new AppVm());

// implement the IResolver interface
export const resolver: IResolver = {
    get: (key: any) => {
        return container.get(key);
    }
};
```