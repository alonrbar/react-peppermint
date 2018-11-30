import { createActionDecorator } from './createActionDecorator';

/**
 * Method decorator.
 * 
 * Mark this method to be run on componentDidMount.
 */
export const activate = createActionDecorator('activate');