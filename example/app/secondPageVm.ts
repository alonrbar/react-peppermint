import { viewModel } from '../../src';
import { Router } from './router';

@viewModel
export class SecondPageVM {

    public someValue = 'second page (2)';

    constructor(public readonly router: Router) { }

    public updateValue(val: string) {
        this.someValue = val;
    }
}