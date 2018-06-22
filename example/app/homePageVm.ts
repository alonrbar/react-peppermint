import { action, broadcast, viewModel } from '../../src';
import { Router } from './router';

@viewModel
export class HomePageVM {

    public someValue = 'home page (1)';

    constructor(public readonly router: Router) { }

    @action
    public updateValue(val: string) {
        this.someValue = val;
    }    

    @broadcast
    public refreshAll() {
        console.log('refreshing');
    }
}