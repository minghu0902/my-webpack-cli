const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'index': path.resolve(__dirname, '../src/pages/index/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader'
              }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/pages/index/index.html'),
            filename: 'index.html'
        })
    ]
}