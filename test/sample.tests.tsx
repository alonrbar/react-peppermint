import * as React from 'react';
import { render } from '@testing-library/react'
import { IResolver, Provider } from 'src';


describe('Sample', () => {

    const dummyResolver: IResolver = {
        get: () => {
            return undefined;
        }
    };

    test('render a Provider', () => {
        const res = render(
            <Provider resolver={dummyResolver}>
                <div>Test</div>
            </Provider>
        )
        expect(res).toBeTruthy();
    });
});
