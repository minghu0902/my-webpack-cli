/** 
 *  默认一个页面中包含两个chunk，一个是入口文件，一个是公共文件 common.js,
 *  如果需要其他的chunk，则需要在这里配置，并在 splitChunks.cacheGroups 中拆分出这这模块
*/

module.exports = {
  common: ['vendors', 'common']
}