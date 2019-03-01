const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const prodConfig = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['../dist']),
    new OptimizeCssAssetsPlugin()
  ]
}

module.exports = merge(baseConfig, prodConfig);
