var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        "main": './example/main.tsx'
    },
    devServer: {
        port: 80,
        hot: true,
        stats: "minimal"
    },
    devtool: 'source-map',
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        chunkFilename: '[id].js',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    module: {
        rules: [
            { test: /(\.ts|\.tsx)$/, use: 'ts-loader' },
            { test: /\.html$/, use: 'html-loader' },
            { test: /(\.css|\.scss)$/, use: ['style-loader', 'css-loader'] },
            { test: /(.png$|.gif$)/, use: [{ loader: "file-loader", query: { name: "res/[name].[ext]" } }] },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: [{ loader: "file-loader", query: { name: "res/[name].[ext]" } }] }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
        modules: [path.resolve("."), "node_modules"]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'example/index.html',
            inject: true,
            minify: false
        }),
        new ProgressBarPlugin({
            clear: true
        })
    ]
};