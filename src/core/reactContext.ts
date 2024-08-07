import * as React from 'react';
import { VmContainer } from './vmContainer';

//
// This is the internal React context provider. The provider that is exposed to
// the end user is in a separate file.
//

export interface ReactContext {
    vmContainer: VmContainer;
}

export const { Provider, Consumer } = React.createContext<ReactContext>(undefined);
