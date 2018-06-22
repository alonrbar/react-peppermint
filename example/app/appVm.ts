import { viewModel } from '../../src';
import { Router } from './router';

@viewModel
export class AppVM {
    constructor(public readonly router: Router) { }
}