const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'lodash': ['lodash'],
  },
  output: {
    path: path.resolve(__dirname, '../dll/'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.js')
    }),
    new CleanWebpackPlugin(['dll/'], { root: path.resolve(__dirname, '../') })
  ]
}