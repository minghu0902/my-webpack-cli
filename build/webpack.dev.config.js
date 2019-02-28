const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const devConfig = {
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist/'),
        open: false,
        port: 9090,
        hot: true,
        hotOnly: true
    }
}

module.exports = merge(baseConfig, devConfig);
