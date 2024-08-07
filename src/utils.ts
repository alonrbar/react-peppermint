import { isSymbol } from './symbols';
import { Constructor, Func, IMap, Method } from './types';

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
 * When using `Object.assign` TypeScript assigns property values (invoking
 * getters) but Babel does not. Using this method we can be sure that properties
 * are also copied to the target object.
 */
export function assignWithProperties(target: object, ...sources: object[]): object {

    // assign fields
    target = Object.assign(target, ...sources);

    // add all properties
    for (const source of sources) {
        const proto = Object.getPrototypeOf(source);
        for (const key of Object.getOwnPropertyNames(proto)) {
            const desc = Object.getOwnPropertyDescriptor(proto, key);
            const hasGetter = desc && typeof desc.get === 'function';
            if (hasGetter) {
                (target as any)[key] = desc.get.call(source);
            }
        }
    }

    return target;
}

/**
 * Define properties of 'source' in 'target'.
 * @param target
 * @param source
 * @param descriptorTypes By default all properties (fields, properties, methods) are defined.
 * If specified will define only the specified property types.
 */
export function defineProperties(target: object, source: object, descriptorTypes?: DescriptorType[]): object {
    const descriptors = getAllPropertyDescriptors(source, descriptorTypes);
    for (const key of Object.keys(descriptors)) {
        Object.defineProperty(target, key, descriptors[key]);
    }
    return target;
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

export function isPromise(candidate: any) {
    return (candidate && typeof candidate.then === 'function');
}

/**
 * Removes one element from the array and returns the removed element.
 */
export function removeOneFromArray<T>(array: T[], item: T): T {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === item) {
            return array.splice(i, 1)[0];
        }
    }

    return undefined;
}

export function tryInvoke<TIn, TOut>(func: Func<TIn, TOut>, ...args: TIn[]): TOut {
    if (typeof func !== 'function') {
        return undefined;
    }

    return func(...args);
}
