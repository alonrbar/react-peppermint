import { ViewModelClassInfo } from "../info";
import { ActionOptions } from "../options";

/**
 * Method decorator.
 * 
 * Mark this method as an all-view refresher.
 */
export function broadcast(options: ActionOptions): PropertyDecorator;
export function broadcast(target: object, propertyKey: string | symbol): void;
export function broadcast(targetOrOptions: any, propertyKeyOrNothing?: string | symbol): any {
    if (propertyKeyOrNothing) {

        // call with default options
        broadcastDecorator.call(undefined, targetOrOptions, propertyKeyOrNothing);
    } else {

        // call with custom options
        return (target: object, propertyKey: string | symbol) => broadcastDecorator(target, propertyKey, targetOrOptions);
    }
}

function broadcastDecorator(target: object, propertyKey: string | symbol, options?: ActionOptions): void {
    const info = ViewModelClassInfo.getOrInitInfo(target);
    info.broadcast[propertyKey as any] = new ActionOptions(options);
}