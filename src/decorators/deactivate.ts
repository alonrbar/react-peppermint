import { VmClassInfo } from "../core/vmClassInfo";

/**
 * Method decorator.
 * 
 * Mark this method to be run on componentWillUnmount.
 */
export function deactivate(target: object, propertyKey: string | symbol): void {
    const info = VmClassInfo.getOrInitInfo(target);
    info.deactivate = propertyKey;
}