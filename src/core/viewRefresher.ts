import { removeOneFromArray } from '../utils';

export type RefreshCallback = VoidFunction

export class ViewRefresher {

    private readonly callbacksByViewModel = new Map<any, Set<RefreshCallback>>();
    private allCallbacks: RefreshCallback[] = [];

    constructor(refreshRoot: RefreshCallback) {
        this.allCallbacks.push(refreshRoot);
    }

    public registerView(vm: any, refreshView: RefreshCallback): void {

        // Update callbacksByViewModel collection
        let callbacks = this.callbacksByViewModel.get(vm);
        if (!callbacks) {
            callbacks = new Set();
            this.callbacksByViewModel.set(vm, callbacks);
        }
        callbacks.add(refreshView);

        // Update allCallbacks collections
        this.allCallbacks.push(refreshView);
    }

    public unregisterView(vm: any, refreshView: RefreshCallback): void {

        // Update callbacksByViewModel collection
        const callbacks = this.callbacksByViewModel.get(vm);
        callbacks.delete(refreshView);
        if (!callbacks.size) {
            this.callbacksByViewModel.delete(vm);
        }

        // Update allCallbacks collections
        removeOneFromArray(this.allCallbacks, refreshView);
    }

    public refreshViews(refreshAll: boolean, vm: any): void {
        let callbacks: RefreshCallback[] | Set<RefreshCallback>;

        if (refreshAll) {
            callbacks = this.allCallbacks.slice();
        } else {
            callbacks = this.callbacksByViewModel.get(vm);
        }

        if (callbacks) {
            for (const callback of callbacks) {
                callback();
            }
        }
    }
}
