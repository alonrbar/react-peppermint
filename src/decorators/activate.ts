import { ViewModelClassInfo } from "../info";

/**
 * Method decorator.
 * 
 * Mark this method to be run on componentDidMount.
 */
export function activate(target: object, propertyKey: string | symbol): void {
    const info = ViewModelClassInfo.getOrInitInfo(target);
    info.activate = propertyKey;
}