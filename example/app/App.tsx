import * as React from 'react';
import { withViewModel } from '../../src';
import { Route, Router } from '../utils';
import { AppVM } from './appVm';
import { HomePage } from './HomePage';
import { SecondPage } from './SecondPage';

export class AppProps {
    public router: Router;
}

class App extends React.PureComponent<AppProps> {
    public render() {
        return (
            <React.Fragment>
                {(this.props.router.activeRoute === Route.HomePage) && <HomePage /> }
                {(this.props.router.activeRoute === Route.SecondPage) && <SecondPage /> }
            </React.Fragment>
        );
    }
}

const connected = withViewModel(AppVM)(App);
export { connected as App };