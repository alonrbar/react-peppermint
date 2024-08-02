/* eslint-disable @typescript-eslint/no-unsafe-function-type */

export declare type ResolverKey<T> = Constructor<T> | string | symbol;

export interface IResolver {
    get<T>(key: ResolverKey<T>): T;
}

export interface MethodInvokeEvent {
    vm: any;
    methodName: string | symbol;
    methodArgs: IArguments;
    isBroadcast: boolean;
}

export function createMethodInvokeArgs(vm: any, methodName: string | symbol, methodArgs: IArguments, isBroadcast: boolean): MethodInvokeEvent {
    return {
        vm,
        methodName,
        methodArgs,
        isBroadcast
    };
}

export interface Constructor<T> {
    new(...args: any[]): T;
}

export interface IMap<T> {
    [key: string]: T;
}

export type Method = Function;

export type Func<TIn, TOut> = (...args: TIn[]) => TOut;
