module.exports = {
  presets: [
    ["@babel/preset-env", {
      // 按需注入 babel-polyfill，比如代码中只使用了 Promise，那么打包的时候就只会打包 babel-polyfill 中 Promise 的代码，不会全部打包进去
      "useBuiltIns": "usage"
    }]
  ]
}