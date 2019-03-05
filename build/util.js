const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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

// 设置 HtmlWebpackPlugin 
function getHtmlWebpackPlugins () {
  const files = glob.sync(path.resolve(__dirname, '../src/pages/**/index.html'));
  return files.map(file => {
    file = path.resolve(file);
    const arr = file.split(path.sep);
    const name = arr[arr.length - 2];
    return new HtmlWebpackPlugin({
      template: file,
      filename: name + '.html',
      chunks: [name],
      removeComments: true,
      collapseWhitespace: true
    })
  })
}

exports.getEntrys = getEntrys;
exports.getHtmlWebpackPlugins = getHtmlWebpackPlugins;
