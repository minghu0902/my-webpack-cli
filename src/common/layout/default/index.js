const headerTpl = require('../../components/header');
const footerTpl = require('../../components/footer');
const layoutTpl = require('./tmp.hbs');

const defaultHeaderCfg = {
  title: '首页'
}

const layout = {
  init: function({ content, headerCfg = {} }) {
    return layoutTpl({
      header: headerTpl(Object.assign(defaultHeaderCfg, headerCfg)),
      footer: footerTpl(),
      content
    })
  }
}

module.exports = layout;
