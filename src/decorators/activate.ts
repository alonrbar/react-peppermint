import { VmClassInfo } from "../core/vmClassInfo";

/**
 * Method decorator.
 * 
 * Mark this method to be run on componentDidMount.
 */
export function activate(target: object, propertyKey: string | symbol): void {
    const info = VmClassInfo.getOrInitInfo(target);
    info.activate = propertyKey;
}