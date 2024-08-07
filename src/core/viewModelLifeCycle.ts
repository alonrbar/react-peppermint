import * as React from 'react';
import { ResolverKey } from 'src/types';
import { tryInvoke } from 'src/utils';
import { ReactContext } from './internalContext';
import { VmContext } from './vmContext';

export class ViewModelLifeCycle {

    public get viewModel() {
        return this._viewModel;
    }

    private view: React.Component;
    private _viewModel: any;

    constructor(private readonly VmClass: ResolverKey<any>) {
    }

    public init(context: ReactContext, view: React.Component) {

        // init only once
        if (this._viewModel)
            return;

        if (!context)
            throw new Error('Context not found. Make sure you use the Provider component.');
        if (!context.resolver)
            throw new Error('Resolver not found. Make sure you use the Provider component.');

        // resolve vm instance
        this.view = view;
        this._viewModel = context.resolver.get(this.VmClass);

        // register for updates
        const vmInfo = VmContext.getContext(this._viewModel);
        if (!vmInfo)
            throw new Error(`Class ${this._viewModel.constructor.name} is used as a view-model but no decorator was used.`);
        vmInfo.registerView(this.view);
    }

    public activate() {
        const vmContext = VmContext.getContext(this._viewModel);
        this.invokeMethods(Object.keys(vmContext.activate || {}));
    }

    public deactivate() {

        // remove registration
        const vmContext = VmContext.getContext(this._viewModel);
        vmContext.unregisterView(this.view);

        // invoke deactivate life cycle method
        this.invokeMethods(Object.keys(vmContext.deactivate || {}));
    }

    //
    // private methods
    //

    private invokeMethods(methodNames: string[]) {
        for (const name of methodNames) {
            tryInvoke(this._viewModel[name]);
        }
    }
}
