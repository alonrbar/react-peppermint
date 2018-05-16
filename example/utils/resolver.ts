import { IResolver } from '../../src';
import { AppVM } from '../app/appVm';
import { HomePageVM } from '../app/homePageVm';
import { SecondPageVM } from '../app/secondPageVm';
import { Router } from './router';

const router = new Router();

const container = new Map<any, any>();
container.set(AppVM, new AppVM(router));
container.set(HomePageVM, new HomePageVM(router));
container.set(SecondPageVM, new SecondPageVM(router));

export const resolver: IResolver = {
    get: (key: any) => {
        return container.get(key);
    }
};