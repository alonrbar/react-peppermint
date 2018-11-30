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

export interface ActionDecorator {
    (options: ActionOptions): PropertyDecorator;
    (target: object, propertyKey: string | symbol): void;
}

/**
 * Method decorator.
 * 
 * Mark this method to be run on componentDidMount.
 */
export const activate: ActionDecorator;

/**
 * Method decorator.
 * 
 * Mark this method to be run on componentWillUnmount.
 */
export const deactivate: ActionDecorator;

/**
 * Method decorator.
 * 
 * Mark this method as a view refresher.
 */
export const action: ActionDecorator;

/**
 * Method decorator.
 * 
 * Mark this method as an all-view refresher.
 */
export const broadcast: ActionDecorator;

//
// components
//

export interface ProviderProps {
    resolver: IResolver;
    /**
     * This event handler is invoked before a view-model method is invoked.
     */
    onMethodInvokeStart?: (e: MethodInvokeEvent) => void;
    /**
     * This event handler is invoked after a view-model method was invoked and
     * the relevant views were refreshed.  
     */
    onMethodInvokeEnd?: (e: MethodInvokeEvent) => void;
}

export class Provider extends React.PureComponent<ProviderProps> { }

export function withViewModel<TVm = {}>(VmClass: ResolverKey<TVm>): ComponentEnhancer<TVm>;

//
// options
//

export class ActionOptions {

    /**
     * By default if the method result is a promise the view will be refreshed
     * only after the promise is resolved. Set this flag to `true` to skip the
     * wait for the promise.  
     * Note that this flag also affects the time when the onMethodInvokeEnd event is
     * raised.
     *
     * Default: `false`
     */
    public immediate?: boolean;
}

//
// types
//

export type ResolverKey<T> = Constructor<T> | string | symbol;

export interface IResolver {
    get<T>(key: ResolverKey<T>): T;
}

export interface MethodInvokeEvent {
    vm: any;
    methodName: string;
    methodArgs: IArguments;
    isBroadcast: boolean;
}

export type ComponentEnhancer<TInjectedProps> = <TRequiredProps>(Component: React.ComponentType<TRequiredProps>) => React.ComponentClass<OmitProps<TRequiredProps, TInjectedProps>>;

export type OmitProps<T, K> = Pick<T, Exclude<keyof T, keyof K>>;

export interface Constructor<T> {
    new(...args: any[]): T;
}