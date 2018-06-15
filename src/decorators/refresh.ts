import { ViewModelClassInfo } from "../info";

/**
 * Method decorator.
 * 
 * Mark this method as a view refresher.
 */
export function refresh(target: object, propertyKey: string | symbol): void {
    const info = ViewModelClassInfo.getOrInitInfo(target);
    info.refresh[propertyKey as any] = true;
}