import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';

const extensions = ['.ts', '.tsx'];

export default {
    input: 'src/index.ts',
    external: [/node_modules/],
    output: [
        {
            file: 'dist/cjs/react-peppermint.cjs',
            format: 'cjs'
        },
        {
            file: 'dist/es/react-peppermint.mjs',
            format: 'es'
        }
    ],
    plugins: [
        nodeResolve({
            extensions
        }),
        babel({
            extensions,
        })
    ]
};
