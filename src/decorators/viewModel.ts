import { VmClassInfo } from "../core/vmClassInfo";

// tslint:disable:ban-types

/**
 * Class decorator.
 * 
 * Mark this class as a view-model class.
 */
export function viewModel(ctor: Function): any {
    VmClassInfo.getOrInitInfo(ctor);
}