import * as React from 'react';
import { withViewModel } from '../../src';
import { Router, SecondPageVM } from '../app';

export class SecondPageProps {
    public router: Router;
    public someValue: string;
    public updateValue: (newValue: string) => void;
}

class SecondPage extends React.PureComponent<SecondPageProps> {
    public render() {
        return (
            <div>
                <h1>Second Page</h1>
                <h2>{this.props.someValue}</h2>
                <button>{}</button>
            </div>
        );
    }
}

const connected = withViewModel(SecondPageVM)(SecondPage);
export { connected as SecondPage };