import { getSymbol, setSymbol, VM_CONTEXT } from '../symbols';
import { ViewRefresher } from './viewRefresher';
import { VmClassInfo } from './vmClassInfo';

export class VmContext {

    public static getContext(vm: any): VmContext {
        if (!vm)
            return undefined;

        return getSymbol(vm, VM_CONTEXT);
    }

    public static initContext(vm: any, vmClassInfo: VmClassInfo, viewRefresher: ViewRefresher): VmContext {
        const info = new VmContext(vm, vmClassInfo, viewRefresher);
        return setSymbol(vm, VM_CONTEXT, info);
    }

    public activate: object = {};
    public deactivate: object = {};
    public readonly registerView: (view: React.Component) => void;
    public readonly unregisterView: (view: React.Component) => void;    

    constructor(vm: any, vmClassInfo: VmClassInfo, viewRefresher: ViewRefresher) {
        this.activate = vmClassInfo.activate;
        this.deactivate = vmClassInfo.deactivate;
        this.registerView = (view: React.Component) => viewRefresher.registerView(vm, view);
        this.unregisterView = (view: React.Component) => viewRefresher.unregisterView(vm, view);
    }
}