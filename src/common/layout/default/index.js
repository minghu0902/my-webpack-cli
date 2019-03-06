const headerTpl = require('../../components/header');
const footerTpl = require('../../components/footer');
const layoutTpl = require('./tmp.hbs');

const layout = {
  init: function({ content, headerCfg = {} }) {
    return layoutTpl({
      header: headerTpl(headerCfg),
      footer: footerTpl(),
      content
    })
  }
}

module.exports = layout;
