import { viewModel } from '../../src';
import { Router } from '../utils';

@viewModel
export class AppVM {
    constructor(public readonly router: Router) { }
}