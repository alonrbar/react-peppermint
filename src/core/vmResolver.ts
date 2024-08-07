import { IResolver, MethodInvokeEvent, ResolverKey } from '../types';
import { patchViewModel } from './patchViewModel';
import { ViewRefresher } from './viewRefresher';
import { VmContext } from './vmContext';
import { VmMetadata } from './vmMetadata';

/**
 * Augments and resolves view-models.
 */
export class VmResolver implements IResolver {

    public onMethodInvokeStart: (e: MethodInvokeEvent) => void;
    public onMethodInvokeEnd: (e: MethodInvokeEvent) => void;

    public readonly internalResolver: IResolver;

    private readonly viewRefresher: ViewRefresher;

    constructor(internalContainer: IResolver, rootComponent: React.Component) {
        this.internalResolver = internalContainer;
        this.viewRefresher = new ViewRefresher(rootComponent);
    }

    public get<T>(key: ResolverKey<T>): T {
        const vm = this.internalResolver.get(key);
        const vmMeta = VmMetadata.get(vm);

        // Not a ViewModel
        if (!vmMeta) {
            return vm;
        }

        // Already patched
        const vmInstanceInfo = VmContext.get(vm);
        if (vmInstanceInfo) {
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
