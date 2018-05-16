
export function isSymbol(obj: any): obj is symbol {
    return typeof obj === 'symbol' || obj instanceof Symbol;
}

export function setSymbol<T>(obj: any, symbol: symbol, value: T): T {
    return obj[symbol] = value;
}

export function getSymbol(obj: any, symbol: symbol): any {
    return obj[symbol];
}

export function getOwnSymbol(obj: any, symbol: symbol): any {
    return Object.getOwnPropertySymbols(obj).includes(symbol) && getSymbol(obj, symbol);
}

/**
 * Stored on view-model instances.
 */
export const VIEW_MODEL_INSTANCE_INFO = Symbol('REACT-VIEW-MODEL.INSTANCE_INFO');
/**
 * Stored on view-model class constructors.
 */
export const VIEW_MODEL_CLASS_INFO = Symbol('REACT-VIEW-MODEL.CLASS_INFO');
