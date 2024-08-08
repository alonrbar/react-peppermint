import { getSymbol, setSymbol, VM_CONTEXT } from '../symbols';
import { ResolverKey } from '../types';
import { tryInvoke } from '../utils';
import { ReactContext } from './reactContext';
import { RefreshCallback, ViewRefresher } from './viewRefresher';
import { VmMetadata } from './vmMetadata';

/**
 * Manages a single view-model instance.
 */
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

    /**
     * Registers a view with the view-model.
     * If the view is already registered, the call is a no-op.
     * Returns the VM context.
     */
    public static registerView(refreshView: RefreshCallback, reactContext: ReactContext, VmClass: ResolverKey<any>): VmContext {
        if (!reactContext) {
            return undefined;
        }

        // Resolve VM instance
        const vm = reactContext.resolve(VmClass);
        if (!vm) {
            throw new Error(`Failed to resolve '${VmClass?.toString()}' view-model.`);
        }

        // Read VM context
        const vmContext = VmContext.get(vm);

        // Register view
        vmContext.registerView(refreshView);

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

    public deactivate(refreshView: RefreshCallback) {
        this.unregisterView(refreshView);
        this.invokeMethods(Object.keys(this.meta.deactivate || {}));
    }

    //
    // Private methods
    //

    private registerView(refreshView: RefreshCallback) {
        this.viewRefresher.registerView(this.vm, refreshView);
    }

    private unregisterView(refreshView: RefreshCallback) {
        this.viewRefresher.unregisterView(this.vm, refreshView);
    }

    private invokeMethods(methodNames: string[]) {
        for (const name of methodNames) {
            tryInvoke(this.vm[name]);
        }
    }
}
