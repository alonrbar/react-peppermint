import { VmClassInfo } from "../core/vmClassInfo";
import { ActionOptions } from "../options";

export interface ActionDecorator {
    (options: ActionOptions): PropertyDecorator;
    (target: object, propertyKey: string | symbol): void;
}

export function createActionDecorator(key: keyof VmClassInfo): ActionDecorator {

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
        const info = VmClassInfo.getOrInitInfo(target);
        info[key][propertyKey as any] = new ActionOptions(options);
    }
}