import { ActionOptions } from '../options';
import { getOwnSymbol, getSymbol, setSymbol, VM_CLASS_INFO } from '../symbols';
import { IMap } from '../types';
import { getConstructorOwnProp, getConstructorProp } from '../utils';

/**
 * Metadata information stored on view-model classes templates.
 * Since it is common to all instances it is stored on the class constructor.
 */
export class VmClassInfo {

    //
    // public static
    //

    public static getInfo(obj: any): VmClassInfo {
        if (!obj)
            return undefined;

        let ownInfo = VmClassInfo.getOwnInfo(obj);
        if (ownInfo)
            return ownInfo;

        // if base class is a view-model class so should this class be
        const baseInfo = VmClassInfo.getBaseInfo(obj);
        if (baseInfo)
            return VmClassInfo.initInfo(obj);

        return undefined;
    }

    public static getOrInitInfo(obj: any): VmClassInfo {

        // get existing info
        const info = VmClassInfo.getInfo(obj);
        if (info)
            return info;

        // create if not exists
        return VmClassInfo.initInfo(obj);
    }

    //
    // private static
    //

    private static getOwnInfo(obj: any): VmClassInfo {
        if (typeof obj === 'object') {
            return getConstructorOwnProp(obj, VM_CLASS_INFO);
        } else {
            return getOwnSymbol(obj, VM_CLASS_INFO);
        }
    }

    private static getBaseInfo(obj: any): VmClassInfo {
        if (typeof obj === 'object') {
            return getConstructorProp(obj, VM_CLASS_INFO);
        } else {
            return getSymbol(obj, VM_CLASS_INFO);
        }
    }

    private static initInfo(obj: any): VmClassInfo {
        // information is stored on the class constructor to 
        // be available to all class instances
        const isConstructor = (typeof obj === 'function' ? true : false);
        const target = (isConstructor ? obj : obj.constructor);

        // derive initial info from base class, if any
        const baseInfo = getSymbol(target, VM_CLASS_INFO);

        // set own info
        const selfInfo = Object.assign(new VmClassInfo(), baseInfo);
        return setSymbol(target, VM_CLASS_INFO, selfInfo);
    }

    //
    // instance members
    //

    public activate: string | symbol;
    public deactivate: string | symbol;
    public actions: IMap<ActionOptions> = {};
    public broadcasts: IMap<ActionOptions> = {};
}