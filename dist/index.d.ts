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
export function action(options: ActionOptions): PropertyDecorator;
export function action(target: object, propertyKey: string | symbol): void;

/**
 * Method decorator.
 * 
 * Mark this method as an all-view refresher.
 */
export function broadcast(options: ActionOptions): PropertyDecorator;
export function broadcast(target: object, propertyKey: string | symbol): void;

//
// components
//

export interface ProviderProps {
    resolver: IResolver;
    onMethodInvoked?: (e: MethodInvokedEvent) => void;
}

export class Provider extends React.PureComponent<ProviderProps> { }

export function withViewModel<TVm = {}>(VmClass: ResolverKey<TVm>): ComponentEnhancer<TVm>;

//
// options
//

export class ActionOptions {

    /**
     * By default if the method result is a promise the action will be invoked
     * only after the promise is resolved. Set this flag to 'true' to skip the
     * wait for the promise.
     */
    public immediate: boolean;
}

//
// types
//

export type ResolverKey<T> = Constructor<T> | string | symbol;

export interface IResolver {
    get<T>(key: ResolverKey<T>): T;
}

export interface MethodInvokedEvent {
    vm: any;
    methodName: string;
}

export type ComponentEnhancer<TInjectedProps> = <TRequiredProps>(Component: React.ComponentType<TRequiredProps>) => React.ComponentClass<OmitProps<TRequiredProps, TInjectedProps>>;

export type OmitProps<T, K> = Pick<T, Exclude<keyof T, keyof K>>;

export interface Constructor<T> {
    new(...args: any[]): T;
}

export interface IMap<T> {
    [key: string]: T;
}

export type Method = Function;

export type RefreshCallback = () => void;