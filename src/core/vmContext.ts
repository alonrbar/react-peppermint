import { ResolverKey } from 'src/types';
import { tryInvoke } from 'src/utils';
import { getSymbol, setSymbol, VM_CONTEXT } from '../symbols';
import { ReactContext } from './reactContext';
import { ViewRefresher } from './viewRefresher';
import { VmMetadata } from './vmMetadata';

export class VmContext {

    public static get(vm: any): VmContext {
        if (!vm)
            return undefined;

        return getSymbol(vm, VM_CONTEXT);
    }

    public static init(vm: any, meta: VmMetadata, viewRefresher: ViewRefresher): VmContext {
        const ctx = new VmContext(vm, meta, viewRefresher);
        return setSymbol(vm, VM_CONTEXT, ctx);
    }

    public static registerView(view: React.Component, reactContext: ReactContext, VmClass: ResolverKey<any>): VmContext {
        if (!reactContext) {
            return undefined;
        }

        // Resolve VM instance
        const vm = reactContext.resolver.get(VmClass);
        if (!vm) {
            throw new Error(`Failed to resolve '${VmClass?.toString()}' view-model.`);
        }

        // Read VM context
        const vmContext = VmContext.get(vm);

        // Register view
        vmContext.registerView(view);

        return vmContext;
    }

    constructor(
        public readonly vm: any,
        private readonly meta: VmMetadata,
        private readonly viewRefresher: ViewRefresher
    ) {
    }

    public activate() {
        this.invokeMethods(Object.keys(this.meta.activate || {}));
    }

    public deactivate(view: React.Component) {
        this.unregisterView(view);
        this.invokeMethods(Object.keys(this.meta.deactivate || {}));
    }

    //
    // Private methods
    //

    private registerView(view: React.Component) {
        this.viewRefresher.registerView(this.vm, view);
    }

    private unregisterView(view: React.Component) {
        this.viewRefresher.unregisterView(this.vm, view);
    }

    private invokeMethods(methodNames: string[]) {
        for (const name of methodNames) {
            tryInvoke(this.vm[name]);
        }
    }
}
