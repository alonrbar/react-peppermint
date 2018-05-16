import { viewModel } from '../../src';
import { Router } from "../utils";

@viewModel
export class SecondPageVM {

    public someValue = 'second page (2)';

    constructor(public readonly router: Router) { }

    public updateValue(val: string) {
        this.someValue = val;
    }
}