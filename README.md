## 基于 webpack4 的多页面脚手架工具 
(vscode 中可以安装 Markdown Preview Enhanced 插件直接预览 Markdown 文件)

### 一、目录介绍
> build: 打包相关配置   
> dll: 第三方库打包后生产的目录  
> env: 环境变量配置   
> src: 开发目录  
> &emsp;- api: 接口配置目录  
> &emsp;- assets: font、css、image、公共资源目录  
> &emsp;- common: 公共组件、布局和脚本文件  
> &emsp;- helper: 目前存放了模板中使用的过滤器方法  
> &emsp;- modules: 相关的模块文件，并统一在 index.ts 中输出  
> &emsp;- pages: 页面文件，一个页面一个目录  
> &emsp;- utils: 工具方法文件，并统一在 index.ts 中输出  
> static: 存放静态文件，打包后直接会被 copy 到根目录下  
> types: 存放自定义的 typescript 类型文件  
> stats.json: webpack --json > stats.json 这条命名生成出来的打包详细信息文件，可以通过[可视化工具(https://webpack.js.org/guides/code-splitting#bundle-analysis)进行打包分析  

### 二、关于第三方库文件的打包
> 1、如果是全局通用的第三方库文件，则可以在 webpack.dll.config.js 中配置，将其单独打包出来  
> 2、如果不是全局通用，则在 webpack.base.config.js 中配置，通过 optimization.splitChunks.cacheGroups 将其拆分出来

### 三、关于第三方库的类型文件
> https://microsoft.github.io/TypeSearch/  
> 到上面这个网址搜索，如果有的话就能搜索到，没有的话就到该项目的github上看看。  
> 找到之后直接安装到开发环境就行，比如 jquery, cnpm i @types/jquery --D  
> 如果都没有找到，就需要自己定义，写到项目根目录的 types 文件夹下

### 四、[代码检查](https://ts.xcatliu.com/engineering/lint.html)
#### 1、eslint的两种使用方式

##### 在编辑器中使用（默认使用 vscode）
> 1. 在编辑器中安装 ESLint 插件  
> 2. 全局安装 或 开发环境安装 eslint babel-eslint  
> 3. 项目根目录下添加 .eslintrc.js 文件，基础配置如下，具体配置看[eslint官网](https://eslint.org/)  
```javascript
  module.exports = {
    "extends": "eslint:recommended", // 继承使用通用的 eslint 规则
    "parser": "babel-eslint",  // 使用 babel-eslint 解析
    "env": {
      "browser": true,
      "node": true
    },
    "rules": {}
  };
```
##### 在打包编译的过程中使用
> 1. 开发环境安装 eslint-loader，并配置  
> 2. 项目根目录下添加 .eslintrc.js，同上  

#### 2、tslint 的使用

##### 在编辑器中使用（默认使用 vscode）
> 1. 在编辑器中安装 TSLint 插件  
> 2. 全局安装 或 开发环境安装 tslint

### 五、配置相关
> * 如果配置了 webpack 的 resolve.alias，则需要同步在 tsconfig.json 中的 paths 中做相应的配置  
> * 如果页面中需要配置处了当前入口文件以外的模块，则需要先将该模块拆分出来，然后在 build/htmlchunks.js 中定义

### 六、关于懒加载 预加载
> 使用 import() 语法

* 懒加载
```javascript
  // 当 document 被点击的时候，会动态加载 lodash 这个模块，返回一个promise
  // 使用 /* webpackChunkName: "lodash" */ 给文件命名，否则就是以webpack打包时候的该模块的id为文件名
  document.addEventListener('click', function() {
    import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
      console.log(_);
    })
  }, false)
```

* 预加载
```javascript
  // 当页面中资源加载完成的时候，就会去预加载 lodash 这个模块，等到 document 第一次被点击的时候会去浏览器缓存中加载这个模块
  // 使用 /* webpackPrefetch: true */，这种方式会在页面 head 中加入下面这行代码
  // <link rel="prefetch" as="script" href="js/lodash_565481dc.js">
  document.addEventListener('click', function() {
    import(/* webpackChunkName: "lodash", webpackPrefetch: true  */ 'lodash').then(_ => {
      console.log(_);
    })
  }, false)
```