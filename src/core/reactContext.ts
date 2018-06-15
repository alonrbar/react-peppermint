import * as React from 'react';
import { IResolver } from '../types';

export interface InternalContext {
    resolver: IResolver;
}

const { Provider, Consumer } = React.createContext<InternalContext>(undefined);

export { Provider as InternalProvider, Consumer as InternalConsumer };