import { VmMetadata } from "../core/vmMetadata";

/* eslint-disable @typescript-eslint/no-unsafe-function-type */

/**
 * Class decorator.
 *
 * Mark this class as a view-model class.
 */
export function viewModel(ctor: Function): any {
    VmMetadata.getOrInit(ctor);
}
