const layout = require('../../common/layout/default/index');
const tpl = require('./index.hbs');

module.exports = layout.init({
  content: tpl({ name: 'hello' }),
  headerCfg: { title: 'home' }
});