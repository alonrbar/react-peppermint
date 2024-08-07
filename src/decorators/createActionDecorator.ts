import { VmMetadata } from "../core/vmMetadata";
import { ActionOptions } from "../options";

export interface ActionDecorator {
    (options: ActionOptions): PropertyDecorator;
    (target: object, propertyKey: string | symbol): void;
}

export function createActionDecorator(key: keyof VmMetadata): ActionDecorator {

    return (targetOrOptions: any, propertyKeyOrNothing?: string | symbol): any => {
        if (propertyKeyOrNothing) {

            // call with default options
            actionDecorator.call(undefined, targetOrOptions, propertyKeyOrNothing);
        } else {

            // call with custom options
            return (target: object, propertyKey: string | symbol) => actionDecorator(target, propertyKey, targetOrOptions);
        }
    };

    function actionDecorator(target: object, propertyKey: string | symbol, options?: ActionOptions): void {
        const meta = VmMetadata.getOrInit(target);
        meta[key][propertyKey as any] = new ActionOptions(options);
    }
}
