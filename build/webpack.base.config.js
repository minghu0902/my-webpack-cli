const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.(jpg|png|gif)$/i,
      use: {
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          name: '[name]_[hash:8].[ext]'
        }
      }
    }, {
      test: /\.(jpg|png|gif)$/i,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    }, {
      test: /\.(eot|woff|ttf|svg)$/i,
      use: {
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
          name: '[name]_[hash:8].[ext]'
        }
      }
    }, {
      test: /\.(css|scss)$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 2
          }
        },
        'sass-loader',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('autoprefixer')({
                "browsers": [
                  "> 1%",
                  "last 6 versions",
                  "not ie <= 8"
                ]
              })
            ]
          }
        }
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/pages/index/index.html'),
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name]_[hash:8].css",
      chunkFilename: "[id]_[hash:8].css"
    })
  ]
}