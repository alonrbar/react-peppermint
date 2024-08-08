import * as React from 'react';
import { ResolverKey } from '../types';

//
// This is the internal React context provider. The provider that is exposed to
// the end user is in a separate file.
//

export interface ReactContext {
    resolve<T>(key: ResolverKey<T>): T
}

export const ReactPeppermintContext = React.createContext<ReactContext>(undefined);
export const { Provider, Consumer } = ReactPeppermintContext;
