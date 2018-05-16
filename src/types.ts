// tslint:disable:ban-types

export declare type ResolverKey<T> = Constructor<T> | string | symbol;

export interface IResolver {
    get<T>(key: ResolverKey<T>): T;
}

export interface Constructor<T> {
    new(...args: any[]): T;
}

export interface IMap<T> { 
    [key: string]: T;
}

export type Method = Function;

export type RefreshCallback = () => void;