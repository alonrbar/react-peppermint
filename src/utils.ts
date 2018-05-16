import { isSymbol } from './symbols';
import { Constructor, IMap, Method } from './types';

export enum DescriptorType {
    None = "None",
    Field = "Field",
    /** 
     * Properties with getter.
     */
    Property = "Property",
    Method = "Method"
}

/**
 * Get own and inherited property descriptor (except those of Object).
 */
export function getAllPropertyDescriptors(obj: any, descriptorTypes?: DescriptorType[]): IMap<PropertyDescriptor> {
    let result: IMap<PropertyDescriptor> = {};

    while (obj.constructor !== Object) {

        // get descriptor of current type
        let descriptors: IMap<PropertyDescriptor> = Object.getOwnPropertyDescriptors(obj);

        // filter by descriptor type
        if (descriptorTypes && descriptorTypes.length) {
            const filteredDescriptors: IMap<PropertyDescriptor> = {};

            for (const key of Object.keys(descriptors)) {
                for (const flag of descriptorTypes) {
                    let shouldAdd = false;
                    switch (flag) {
                        case DescriptorType.None:
                            break;
                        case DescriptorType.Field:
                            shouldAdd = (typeof descriptors[key].value !== 'function' && typeof descriptors[key].get !== 'function');
                            break;
                        case DescriptorType.Property:
                            shouldAdd = (typeof descriptors[key].get === 'function');
                            break;
                        case DescriptorType.Method:
                            shouldAdd = (typeof descriptors[key].value === 'function' && typeof descriptors[key].get !== 'function');
                            break;
                        default:
                            throw new Error("Property flag not supported: " + flag);
                    }

                    if (shouldAdd)
                        filteredDescriptors[key] = descriptors[key];
                }
            }

            descriptors = filteredDescriptors;
        }

        // store in result
        result = Object.assign(descriptors, result);

        // repeat with prototype
        obj = getPrototype(obj);
    }

    // a "constructor" property is always retrieved as part of the result
    if (result.constructor)
        delete result.constructor;

    return result;
}

export function getConstructorProp(obj: object, key: symbol | string): any {
    if (!obj || !obj.constructor)
        return undefined;

    const ctor = (obj.constructor as any);
    return ctor[key];
}

export function getConstructorOwnProp(obj: object, key: symbol | string): any {
    if (!obj || !obj.constructor)
        return undefined;

    const ctor = (obj.constructor as any);
    if (isSymbol(key) && Object.getOwnPropertySymbols(ctor).includes(key)) {
        return ctor[key];
    } else if (typeof key === 'string' && Object.getOwnPropertyNames(ctor).includes(key)) {
        return ctor[key];
    }

    return undefined;
}

/**
 * @param obj 
 * @param bind Whether or not to bind the returned methods to 'obj'. Default value: false.
 */
export function getMethods(obj: object | Constructor<any>, bind = false): IMap<Method> {
    const methodDescriptors = getAllPropertyDescriptors(obj, [DescriptorType.Method]);
    const methods: IMap<Method> = {};
    for (const key of Object.keys(methodDescriptors)) {
        methods[key] = methodDescriptors[key].value;
        if (bind) {
            methods[key] = methods[key].bind(obj);
        }
    }
    return methods;
}

export function getPrototype(obj: object | Constructor<any>): object {
    if (typeof obj === 'object') {
        return Object.getPrototypeOf(obj);
    } else if (typeof obj === 'function') {
        return obj.prototype;
    } else {
        throw new Error("Expected an object or a function. Got: " + obj);
    }
}