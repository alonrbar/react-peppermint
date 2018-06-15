import { ViewModelClassInfo } from "../info";

/**
 * Method decorator.
 * 
 * Mark this method to be run on componentWillUnmount.
 */
export function deactivate(target: object, propertyKey: string | symbol): void {
    const info = ViewModelClassInfo.getOrInitInfo(target);
    info.deactivate = propertyKey;
}