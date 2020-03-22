import * as React from 'react';
import { IResolver } from '../types';

//
// This is the internal React context provider. The provider that is exposed to
// the end user is in a separate file.
//

export interface InternalContext {
    resolver: IResolver;
}

export const internalContext = React.createContext<InternalContext>(undefined);

const { Provider, Consumer } = internalContext;

export { Provider as InternalProvider, Consumer as InternalConsumer };