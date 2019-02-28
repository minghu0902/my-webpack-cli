const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const devConfig = {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist/'),
    open: true,
    port: 9090,
    hot: true,
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({})
  ]
}

module.exports = merge(baseConfig, devConfig);
