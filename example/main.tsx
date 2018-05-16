import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from '../src';
import { App } from './app';
import { resolver } from './utils';

ReactDOM.render(
    <Provider resolver={resolver}>
        <App />
    </Provider>,
    document.getElementById('application-root')
);