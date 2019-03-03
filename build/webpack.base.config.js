const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    'index': path.resolve(__dirname, '../src/pages/index/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name]_[hash:8].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'eslint-loader']
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
      chunks: 'all',
      cacheGroups: {
        lodash: {
          test: /lodash/ig,
          filename: 'js/lodash_[hash:8].js',
          enforce: true
        }
      }
    }
  }
}

//  /** 
//    *  文档：https://webpack.js.org/plugins/split-chunks-plugin/
//    *  splitChunks: {
//    *    chunks: 
//    *        默认值 async, 如果是使用 import('lodash.js') 加载模块，则会将该js单独打包出来，
//    *        默认以改模块的id为filename生成一个js，如果要对该模块命名，则这样做 import(/* webpackChunkName: "lodash" */ 'lodash'), 
//    *        此时打包生成的文件名为 vendors-lodash.js, 如果想要文件名为 lodash.js, 则需要把 cacheGroups 下的 vendors 和 default 设置为 false。
//    *        如果将该模块设置为预加载，则这样做 import(/* webpackChunkName: "lodash", webpackPrefetch: true */ 'lodash')，即：在页面所有资源加载完成，网络空闲的时候去加载这个js。
//    *        initial，则表示不是 import() 方式引入的模块
//    *        all, 表示 async 和 initial 都支持
//    *    minSize: 默认值 30000，表示如果该模块的文件大小如果大于这个值，则满足条件
//    *    maxSize: 默认值 0 
//    *    minChunks: 默认值 1, 表示模块被引入的次数
//    *    maxAsyncRequests: 5, 设置按需加载时最大的数量，主要针对 import() 加载的模块的数量，超出了则不会进行拆分 
//    *    maxInitialRequests: 3, 设置入口文件中最多拆分的模块的数量
//    *    automaticNameDelimiter: '~'，设置生成的文件名的连接符
//    *    name: 默认为true, 基于块和缓存组键的名称，可以以字符串的方式自定义
//    *    cacheGroups: { // 该设置继承上面所有的配置，也可以自定义覆盖上面的配置项
//    *      vendors: {
//    *        test: 用来匹配当前缓存组选择哪些模块，function (module, chunk) | RegExp | string
//    *        filename: '[name].bundle.js', 官网上警告避免在 splitChunks 中全局设置 
//    *        priority: -10，数值，设置优先级，数值越大优先级越高
//    *        enforce: true, 忽略 splitChunks 的 minSize、minChunks、maxAsyncRequests、maxInitialRequests 这些选项，并强制创建这个 cache group
//    *        reuseExistingChunk: true, 如果该模块已经被拆分出来了，那么将会重用，而不是在生成一个新的模块或打包到别得模块中
//    *      },
//    *      default // 配置项同上
//    *    }
//    *  }
//   */

/** 
 *  文档：https://webpack.js.org/configuration/devtool/#devtool
 *  关于devtool的配置
 *    对几种模式中的关键字说明：
 *      source-map: 会生成 .map 的文件，会对源代码映射到第几行第几列
 *      inline: 将source-map文件以base64的格式嵌入到打包后的代码中
 *      cheap: 只会对源代码映射到第几行，不会映射到列，相对单纯的 source-map 打包效率要高
 *      module: 会对代码中引入的第三方模块(比如引入的node_modules中的代码)也进行代码映射
 *      eval: 在打包后的代码中以eval的方式进行映射，是打包效率而最高的一种
*/

/** 
 *  文档：https://webpack.js.org/configuration/externals#externals
 *  externals: string object function regex，不希望被打包的模块可以配置在这里
*/

/** 
 *  文档：https://webpack.js.org/guides/code-splitting#bundle-analysis
 *  打包分析：
 *  1、通过命令生成打包详细信息的json文件， webpack --json > stats.json
 *  2、通过官网上介绍的打包分析的可视化工具，上传 stats.json
*/