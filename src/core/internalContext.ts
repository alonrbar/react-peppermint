import * as React from 'react';
import { IResolver, MethodInvokeEvent } from '../types';

//
// This is the internal React context provider. The provider that is exposed to
// the end user is in a separate file.
//

export interface InternalContext {
    resolver: IResolver;
    onMethodInvokeStart: (e: MethodInvokeEvent) => void;
    onMethodInvokeEnd: (e: MethodInvokeEvent) => void;
}

const { Provider, Consumer } = React.createContext<InternalContext>(undefined);

export { Provider as InternalProvider, Consumer as InternalConsumer };