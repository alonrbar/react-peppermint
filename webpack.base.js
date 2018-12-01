const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: [path.resolve('./src/index.ts')],
    output: {
        path: path.resolve('./dist'),        
        library: 'react-peppermint',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this'
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            { test: /(\.ts|\.tsx)$/, use: 'ts-loader' }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
        modules: [path.resolve('./src'), 'node_modules']
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};