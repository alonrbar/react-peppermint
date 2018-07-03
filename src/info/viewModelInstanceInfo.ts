import { getSymbol, setSymbol, VIEW_MODEL_INSTANCE_INFO } from '../symbols';

/**
 * Metadata stored on every view-model instance.
 */
export class ViewModelInstanceInfo {

    public static getInfo(vm: any): ViewModelInstanceInfo {
        if (!vm)
            return undefined;

        return getSymbol(vm, VIEW_MODEL_INSTANCE_INFO);
    }

    public static initInfo(vm: any): ViewModelInstanceInfo {
        const info = new ViewModelInstanceInfo();
        return setSymbol(vm, VIEW_MODEL_INSTANCE_INFO, info);
    }

    public activate: string | symbol;
    public deactivate: string | symbol;
    public addView: (view: React.Component) => void;
    public removeView: (view: React.Component) => void;
}