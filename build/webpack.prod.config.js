const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new OptimizeCssAssetsPlugin(),
    new CleanWebpackPlugin(['dist/'], { root: path.resolve(__dirname, '../') })
  ]
}

module.exports = merge(baseConfig, prodConfig);
