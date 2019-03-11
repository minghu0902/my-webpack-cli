const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const htmlChunks = require('./htmlchunks');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';

// 获取入口文件
function getEntrys () {
  const files = glob.sync(path.resolve(__dirname, '../src/pages/**/index.{ts, js}'));
  let entry = {};
  files.forEach(file => {
    file = path.resolve(file);
    const arr = file.split(path.sep);
    const key = arr[arr.length - 2];
    entry[key] = file;
  });
  return entry;
}


/** 
 *  如果页面中初了通用模块之外，还需加载其他模块，则需要在 config/htmlchunks.js 中配置。
 *  比如，order.html ，这个页面除了 ['order', 'common']，之外还有支付和分享模块，则配置 
 *  order : ['payment', 'share']，但必须得保证在 splitChunks.cacheGroups 中拆分出了这两个模块
*/

// 设置 HtmlWebpackPlugin 
function getHtmlWebpackPlugins () {
  const files = glob.sync(path.resolve(__dirname, '../src/pages/**/index.art'));
  return files.map(file => {
    file = path.resolve(file);
    const arr = file.split(path.sep);
    const name = arr[arr.length - 2];
    return new HtmlWebpackPlugin({
      template: file,
      filename: name + '.html',
      chunks: htmlChunks[name] ? htmlChunks['common'].concat(htmlChunks[name]).concat(name) : htmlChunks['common'].concat(name),
      minify: isDev ? false : {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  })
}

/**
*  设置 addAssetHtmlWebpackPlugin，这个插件用来向页面中插入静态资源，
*  这里的作用是将 webpack.dll.config.js 打包出来的第三方文件（即 dll 目录下的 *.dll.js）插入到页面中
*/
function getAddAssetHtmlWebpackPlugins() {
  const files = glob.sync(path.resolve(__dirname, '../dll/*.dll.js'));
  const arr = [];
  files.forEach(file => {
    arr.push({ filepath: file, outputPath: 'js/vendors/', publicPath: "js/vendors/" });
  })
  return new addAssetHtmlWebpackPlugin(arr);
}

/**
 * 设置 DllReferencePlugin，改插件需要配置一个映射文件（即dll目录下的 *.manifest.js 文件，
 * 这个文件是通过 webpack.dll.config.js 中 DllPlugin 插件生成的），然后当 webpack 在打包的时候，如果打包到了一个模块，
 * 他会看这个映射文件中有没有这个模块，如果有就直接使用，不需要重新打包。主要是避免第三库的重复打包，因为第三方的库文件一般是不变的，
 * 那就没必要重复打包，所以只要一开始打包一次就行了，这个插件配合 DllPlugin 插件就是为了解决这个问题。
 */
function getDllReferencePlugins() {
  const files = glob.sync(path.resolve(__dirname, '../dll/*.manifest.js'));
  return files.map(file => {
    return new webpack.DllReferencePlugin({ manifest: file });
  })
}

exports.getEntrys = getEntrys;
exports.getHtmlWebpackPlugins = getHtmlWebpackPlugins;
exports.getAddAssetHtmlWebpackPlugins = getAddAssetHtmlWebpackPlugins;
exports.getDllReferencePlugins = getDllReferencePlugins;
