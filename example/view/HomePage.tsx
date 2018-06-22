import * as React from 'react';
import { withViewModel } from '../../src';
import { HomePageVM, Route, Router } from '../app';

export class HomePageProps {
    public router: Router;
    public someValue: string;
    public updateValue: (newValue: string) => void;
    public refreshAll: () => void;
}

class HomePage extends React.PureComponent<HomePageProps> {
    public render() {
        return (
            <div>
                <h1>Home Page</h1>
                <h2>{this.props.someValue}</h2>
                <button
                    onClick={() => this.props.updateValue('hi')}
                >
                    Change value
                </button>
                <button
                    onClick={() => {
                        this.props.router.goTo(Route.SecondPage);
                        this.props.refreshAll();
                    }}
                >
                    Go to other  page
                </button>
            </div>
        );
    }
}

const connected = withViewModel(HomePageVM)(HomePage);
export { connected as HomePage };