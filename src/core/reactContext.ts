import * as React from 'react';
import { IResolver } from '../types';

//
// This is the internal React context provider. The provider that is exposed to
// the end user is in a separate file.
//

export interface ReactContext {
    resolver: IResolver;
}

export const { Provider, Consumer } = React.createContext<ReactContext>(undefined);
