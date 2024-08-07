import { IResolver, MethodInvokeEvent, ResolverKey } from '../types';
import { patchViewModel } from './patchViewModel';
import { RefreshCallback, ViewRefresher } from './viewRefresher';
import { VmContext } from './vmContext';
import { VmMetadata } from './vmMetadata';

/**
 * Augments and resolves view-models.
 */
export class VmContainer {

    public onMethodInvokeStart: (e: MethodInvokeEvent) => void;
    public onMethodInvokeEnd: (e: MethodInvokeEvent) => void;

    public readonly internalContainer: IResolver;

    private readonly viewRefresher: ViewRefresher;

    constructor(internalContainer: IResolver, refreshRoot: RefreshCallback) {
        this.internalContainer = internalContainer;
        this.viewRefresher = new ViewRefresher(refreshRoot);
    }

    public get<T>(key: ResolverKey<T>): T {
        const vm = this.internalContainer.get(key);
        const vmMeta = VmMetadata.get(vm);

        // Not a ViewModel
        if (!vmMeta) {
            return vm;
        }

        // Already patched
        const vmContext = VmContext.get(vm);
        if (vmContext) {
            return vm;
        }

        // Patch new ViewModel instance
        patchViewModel({
            vm: vm,
            vmMeta: vmMeta,
            viewRefresher: this.viewRefresher,
            onMethodInvokeStart: this.onMethodInvokeStart,
            onMethodInvokeEnd: this.onMethodInvokeEnd
        });
        return vm;
    }
}
