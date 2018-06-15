import * as React from 'react';

//
// decorators
//

/**
 * Class decorator.
 * 
 * Mark this class as a view-model class.
 */
export function viewModel(ctor: Function): any;

/**
 * Method decorator.
 * 
 * Mark this method to be run on componentDidMount.
 */
export function activate(target: object, propertyKey: string | symbol): void;

/**
 * Method decorator.
 * 
 * Mark this method to be run on componentWillUnmount.
 */
export function deactivate(target: object, propertyKey: string | symbol): void;

/**
 * Method decorator.
 * 
 * Mark this method as a view refresher.
 */
export function action(target: object, propertyKey: string | symbol): void;

/**
 * Method decorator.
 * 
 * Mark this method as an all-view refresher.
 */
export function broadcast(target: object, propertyKey: string | symbol): void;

//
// components
//

export interface ProviderProps {
    resolver: IResolver;
}

export class Provider extends React.PureComponent<ProviderProps> { }

export function withViewModel(VmClass: ResolverKey<any>): (Component: React.ComponentType) => React.PureComponent;

//
// types
//

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