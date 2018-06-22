import { getOwnSymbol, getSymbol, setSymbol, VIEW_MODEL_CLASS_INFO } from '../symbols';
import { IMap } from '../types';
import { getConstructorOwnProp, getConstructorProp } from '../utils';

/**
 * Metadata information stored on view-model classes templates.
 * Since it is common to all instances it is stored on the class constructor.
 */
export class ViewModelClassInfo {

    //
    // public static
    //

    public static getInfo(obj: any): ViewModelClassInfo {
        if (!obj)
            return undefined;

        let ownInfo = ViewModelClassInfo.getOwnInfo(obj);
        if (ownInfo)
            return ownInfo;

        // if base class is a view-model class so should this class be
        const baseInfo = ViewModelClassInfo.getBaseInfo(obj);
        if (baseInfo)
            return ViewModelClassInfo.initInfo(obj);

        return undefined;
    }

    public static getOrInitInfo(obj: any): ViewModelClassInfo {

        // get existing info
        const info = ViewModelClassInfo.getInfo(obj);
        if (info)
            return info;

        // create if not exists
        return ViewModelClassInfo.initInfo(obj);
    }

    //
    // private static
    //

    private static getOwnInfo(obj: any): ViewModelClassInfo {
        if (typeof obj === 'object') {
            return getConstructorOwnProp(obj, VIEW_MODEL_CLASS_INFO);
        } else {
            return getOwnSymbol(obj, VIEW_MODEL_CLASS_INFO);
        }
    }

    private static getBaseInfo(obj: any): ViewModelClassInfo {
        if (typeof obj === 'object') {
            return getConstructorProp(obj, VIEW_MODEL_CLASS_INFO);
        } else {
            return getSymbol(obj, VIEW_MODEL_CLASS_INFO);
        }
    }

    private static initInfo(obj: any): ViewModelClassInfo {
        // information is stored on the class constructor to 
        // be available to all class instances
        const isConstructor = (typeof obj === 'function' ? true : false);
        const target = (isConstructor ? obj : obj.constructor);

        // derive initial info from base class, if any
        const baseInfo = getSymbol(target, VIEW_MODEL_CLASS_INFO);

        // set own info
        const selfInfo = Object.assign(new ViewModelClassInfo(), baseInfo);
        return setSymbol(target, VIEW_MODEL_CLASS_INFO, selfInfo);
    }

    //
    // instance members
    //

    public activate: string | symbol;
    public deactivate: string | symbol;
    public refresh: IMap<boolean> = {};
    public refreshAll: IMap<boolean> = {};
}