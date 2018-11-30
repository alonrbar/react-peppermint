import { removeOneFromArray } from '../utils';

export class ViewRefresher {

    private readonly viewsByViewModel = new Map<any, Set<React.Component>>();
    private allViews: React.Component[] = [];

    constructor(rootComponent: React.Component) {
        this.allViews.push(rootComponent);
    }

    public registerView(vm: any, view: React.Component): void {

        // update viewsByViewModel collection
        let components = this.viewsByViewModel.get(vm);
        if (!components) {
            components = new Set();
            this.viewsByViewModel.set(vm, components);
        }
        components.add(view);

        // update allViews collections
        this.allViews.push(view);
    }

    public unregisterView(vm: any, view: React.Component): void {

        // update viewsByViewModel collection
        const components = this.viewsByViewModel.get(vm);
        components.delete(view);
        if (!components.size)
            this.viewsByViewModel.delete(vm);

        // update allViews collections
        removeOneFromArray(this.allViews, view);
    }

    public refreshViews(refreshAll: boolean, vm: any): void {
        let views: React.Component[] | Set<React.Component>;

        if (refreshAll) {
            views = this.allViews.slice();
        } else {
            views = this.viewsByViewModel.get(vm);
        }

        if (views) {
            (views as React.Component[]).forEach(component => {
                // Note that we're updating the wrapping ComponentWithViewModel
                // component, the actual component may not be updated at all
                // (depending on it's shouldComponentUpdate result). That's why
                // we can use forceUpdate instead of setState and spare the
                // implicit shouldComponentUpdate on the wrapping component.
                component.forceUpdate();
            });
        }
    }
}