import { ActionOptions } from '../options';
import { getOwnSymbol, getSymbol, setSymbol, VM_METADATA } from '../symbols';
import { IMap } from '../types';
import { getConstructorOwnProp, getConstructorProp } from '../utils';

/**
 * Metadata information stored on view-model classes templates.
 * Since it is common to all instances it is stored on the class constructor.
 */
export class VmMetadata {

    //
    // Public static
    //

    public static get(obj: any): VmMetadata {
        if (!obj)
            return undefined;

        const ownMeta = VmMetadata.getOwn(obj);
        if (ownMeta)
            return ownMeta;

        // If base class is a view-model class so should this class be
        const baseMeta = VmMetadata.getBase(obj);
        if (baseMeta)
            return VmMetadata.init(obj);

        return undefined;
    }

    public static getOrInit(obj: any): VmMetadata {

        // Get existing info
        const info = VmMetadata.get(obj);
        if (info)
            return info;

        // Create if not exists
        return VmMetadata.init(obj);
    }

    //
    // Private static
    //

    private static getOwn(obj: any): VmMetadata {
        if (typeof obj === 'object') {
            return getConstructorOwnProp(obj, VM_METADATA);
        } else {
            return getOwnSymbol(obj, VM_METADATA);
        }
    }

    private static getBase(obj: any): VmMetadata {
        if (typeof obj === 'object') {
            return getConstructorProp(obj, VM_METADATA);
        } else {
            return getSymbol(obj, VM_METADATA);
        }
    }

    private static init(obj: any): VmMetadata {
        // Metadata is stored on the class constructor to
        // be available to all class instances
        const isConstructor = (typeof obj === 'function' ? true : false);
        const target = (isConstructor ? obj : obj.constructor);

        // Derive initial metadata from base class, if any
        const baseMeta = getSymbol(target, VM_METADATA);

        // Set own metadata
        const selfMeta = Object.assign(new VmMetadata(), baseMeta);
        return setSymbol(target, VM_METADATA, selfMeta);
    }

    //
    // Instance members (stored metadata)
    //

    public activate: IMap<ActionOptions> = {};
    public deactivate: IMap<ActionOptions> = {};
    public actions: IMap<ActionOptions> = {};
    public broadcasts: IMap<ActionOptions> = {};
}
