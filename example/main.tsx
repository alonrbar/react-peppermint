import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from '../src';
import { resolver } from './app';
import { App } from './view';

ReactDOM.render(
    <Provider resolver={resolver}>
        <App />
    </Provider>,
    document.getElementById('application-root')
);