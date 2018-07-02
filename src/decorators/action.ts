import { ViewModelClassInfo } from "../info";
import { ActionOptions } from "../options";

/**
 * Method decorator.
 * 
 * Mark this method as a view refresher.
 */
export function action(options: ActionOptions): PropertyDecorator;
export function action(target: object, propertyKey: string | symbol): void;
export function action(targetOrOptions: any, propertyKeyOrNothing?: string | symbol): any {
    if (propertyKeyOrNothing) {

        // call with default options
        actionDecorator.call(undefined, targetOrOptions, propertyKeyOrNothing);
    } else {

        // call with custom options
        return (target: object, propertyKey: string | symbol) => actionDecorator(target, propertyKey, targetOrOptions);
    }
}

function actionDecorator(target: object, propertyKey: string | symbol, options?: ActionOptions): void {
    const info = ViewModelClassInfo.getOrInitInfo(target);
    info.action[propertyKey as any] = new ActionOptions(options);
}