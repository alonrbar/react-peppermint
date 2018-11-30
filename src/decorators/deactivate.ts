import { createActionDecorator } from './createActionDecorator';

/**
 * Method decorator.
 * 
 * Mark this method to be run on componentWillUnmount.
 */
export const deactivate = createActionDecorator('deactivate');