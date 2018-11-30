import { createActionDecorator } from './createActionDecorator';

/**
 * Method decorator.
 * 
 * Mark this method as a view refresher.
 */
export const action = createActionDecorator('actions');