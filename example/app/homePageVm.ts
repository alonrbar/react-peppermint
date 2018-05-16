import { refresh, refreshAll, viewModel } from '../../src';
import { Router } from '../utils';

@viewModel
export class HomePageVM {

    public someValue = 'home page (1)';

    constructor(public readonly router: Router) { }

    @refresh
    public updateValue(val: string) {
        this.someValue = val;
    }    

    @refreshAll
    public refreshAll() {
        console.log('refreshing');
    }
}