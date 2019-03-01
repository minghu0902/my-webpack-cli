module.exports = {
  presets: [
    ["@babel/preset-env", {
      // 按需注入 babel-polyfill，无需在代码中引入 babel-polyfill, 该配置会默认引入,
      // 如果代码中只使用了 Promise，那么打包的时候就只会打包 babel-polyfill 中 Promise 的代码，不会全部打包进去
      "useBuiltIns": "usage"
    }]
  ],
  plugins: [
    // 使用 import('lodash') 这样的语法
    "@babel/plugin-syntax-dynamic-import"
  ]
}