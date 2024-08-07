import { getSymbol, setSymbol, VM_CONTEXT } from '../symbols';
import { ViewRefresher } from './viewRefresher';
import { VmMetadata } from './vmMetadata';

export class VmContext {

    public static getContext(vm: any): VmContext {
        if (!vm)
            return undefined;

        return getSymbol(vm, VM_CONTEXT);
    }

    public static initContext(vm: any, meta: VmMetadata, viewRefresher: ViewRefresher): VmContext {
        const ctx = new VmContext(vm, meta, viewRefresher);
        return setSymbol(vm, VM_CONTEXT, ctx);
    }

    public activate: object = {};
    public deactivate: object = {};

    constructor(
        private readonly vm: any,
        meta: VmMetadata,
        private readonly viewRefresher: ViewRefresher
    ) {
        this.activate = meta.activate;
        this.deactivate = meta.deactivate;
    }

    public registerView(view: React.Component) {
        this.viewRefresher.registerView(this.vm, view);
    }

    public unregisterView(view: React.Component) {
        this.viewRefresher.unregisterView(this.vm, view);
    }
}
