const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(base, {
    mode: 'production',
    output: {
        filename: 'react-peppermint.min.js'
    },
    optimization: {
        noEmitOnErrors: true,
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: false
            })
        ]
    }
});