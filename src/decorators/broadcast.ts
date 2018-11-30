import { createActionDecorator } from './createActionDecorator';

/**
 * Method decorator.
 * 
 * Mark this method as an all-view refresher.
 */
export const broadcast = createActionDecorator('broadcasts');