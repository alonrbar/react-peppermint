import { fresh, veryFresh, viewModel } from '../../src';
import { Router } from '../utils';

@viewModel
export class HomePageVM {

    public someValue = 'home page (1)';

    constructor(public readonly router: Router) { }

    @fresh
    public updateValue(val: string) {
        this.someValue = val;
    }    

    @veryFresh
    public refreshAll() {
        console.log('refreshing');
    }
}