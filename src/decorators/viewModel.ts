import { VmClassInfo } from "../core/vmClassInfo";

/* eslint-disable @typescript-eslint/no-unsafe-function-type */

/**
 * Class decorator.
 *
 * Mark this class as a view-model class.
 */
export function viewModel(ctor: Function): any {
    VmClassInfo.getOrInitInfo(ctor);
}
