import { ViewModelClassInfo } from "../info";

/**
 * Method decorator.
 * 
 * Mark this method as an all-view refresher.
 */
export function broadcast(target: object, propertyKey: string | symbol): void {
    const info = ViewModelClassInfo.getOrInitInfo(target);
    info.refreshAll[propertyKey as any] = true;
}