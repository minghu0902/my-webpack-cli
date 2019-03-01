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
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}

//  /** 
//    *  splitChunks: {
//    *    chunks: 
//    *        默认值 async, 如果是使用 import('lodash.js') 加载模块，则会将该js单独打包出来，
//    *        默认以改模块的id为filename生成一个js，如果要对该模块命名，则这样做 import(/* webpackChunkName: "lodash" */ 'lodash'),
//    *        如果将该模块设置为预加载，则这样做 import(/* webpackChunkName: "lodash", webpackPrefetch: true */ 'lodash')，即：在页面所有资源加载完成，网络空闲的时候去加载这个js。
//    *        initial，则表示不是 import() 方式引入的模块
//    *        all, 表示 async 和 initial 都支持
//    *    minSize: 默认值 30000，表示如果该模块的文件大小如果大于这个值，则满足条件
//    *    maxSize: 默认值 0，不限制文件大小的最大值
//    *    minChunks: 默认值 1, 表示模块被引入的次数
//    *    maxAsyncRequests:
//    *    maxInitialRequests:
//    *    automaticNameDelimiter:
//    *    name: 默认为true, 基于块和缓存组键的名称，可以以字符串的方式自定义
//    *    cacheGroups: { // 该设置继承上面所有的配置，也可以自定义覆盖上面的配置项
//    *      vendors: {
//    *        test: 用来匹配当前缓存组选择哪些模块，function (module, chunk) | RegExp | string
//    *        filename: '[name].bundle.js', 官网上警告避免在 splitChunks 中全局设置 
//    *        priority: -10，数值，设置优先级，数值越大优先级越高
//    *        enforce: 忽略 splitChunks 的 minSize、minChunks、maxAsyncRequests、maxInitialRequests 这些选项，并强制创建这个 cache group
//    *      },
//    *      default
//    *    }
//    *  }
//   */