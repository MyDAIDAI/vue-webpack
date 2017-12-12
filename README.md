# vue-webpack
使用webpack搭建vue前端开发环境

## 第一步 初始化项目
1. 运行`npm init -y`创建`package.json`文件
2. 创建`src`和`dist`文件夹分别保存`项目源码`以及`webpack`打包后的文件

## 第二步 安装`webpack`,创建入口文件
1. 运行`npm install --save-dev webpack` 安装`webpack`
2. 在根目录中新建`index.html`文件作为页面入口文件，在`src`文件 新建`main.js`文件作为打包入口文件
3. 运行`webpack src/main.js dist/main.js`，将`src`文件夹中的`main.js`打包进入`dist`文件中
4. 打开`index.html`显示`打包成功啦`
5. 在`package.json`文件中的`scripts`添加运行脚本`"dev": "webpack src/main.js dist/main.js"`
6. 运行`npm run dev`即可对项目进行打包

## 第三步 创建`webpack`配置文件
1. 在根目录下创建`webpack.config`文件夹，保存对于`wepback`的相关配置
2. 在`webpack.config`文件夹下创建`base.js`,存放无论是在开发环境下还是在生产环境都需要用到的配置
3. 修改`package.json`中`script`的`dev`的脚本为`"dev": "webpack --config=webpack.config/base.js"` 

## 第四步 安装初始化`vue`
1. 运行`npm install --save vue` 安装`vue`
2. 安装`vue-loader`， 运行`npm install --save-dev vue-loader` 
3. 安装`vue-template-compiler`，运行`npm install --save vue-template-compiler`
4. 修改`main.js`中的代码为`vue`实例化代码
    ```
      import Vue from 'vue'
      import Home from 'views/Home'
      new Vue({
        el: '#app',
        template: '<Home/>',
        components: { Home }
      })
    ```
5. 在`src`中添加`views`文件夹存放`vue`页面组件, 在`views`文件夹中新建`Home.vue`文件
    ```
      <template>
        <div id="app">
          <div>{{message}}</div>
        </div>
      </template>
      <script>
      export default {
        name: 'app',
        data () {
          return {
            message: 'hello vue',
          }
        },
      }
      </script>
    ```
6. 在`base.js`中添加别名配置以及`loaders`配置, 添加后的配置如下:
  ```
    const path = require('path') // 引入node.js中的path模块，处理文件与目录路径
    // 获取文件路径 _dirname为当前文件所在路径，join将其拼接为路径
    function resolve (dir) {
      return path.join(__dirname, '..', dir)
    }

    module.exports = {
      entry: resolve('src/main.js'), // 打包入口文件
      output: {
        path: resolve('dist'), // 打包出口目录
        filename: 'main.js' //出口文件名
      },
      resolve: {
        alias: {
          'vue$': 'vue/dist/vue.common.js',
          'views': resolve('src/views'),
        },
        extensions: ['.js', '.vue'], //引用js和vue文件可以省略后缀名
      },
      module: {
        loaders: [
          {test: /\.vue$/, loader: 'vue-loader'},
        ]
      }
    }
  ```
7. 运行`npm run dev`，在浏览器中打开`index.html`，页面显示`hello vue`即成功!

## 第五步 安装配置`babel`以及其他`loader`
1. 运行`npm install --save-dev babel-loader babel-core babel-plugin-transform-runtime babel-preset-es2015`
2. 运行`npm install --save-dev css-loader vue-style-loader` 
3. 在`base.js`中配置`js`的`babel-loader`, `{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}`
4. 在根目录下添加`babel`配置文件`.babelrc` 
  ```
  {
    "presets": ["es2015"]
  }
  ```
5. 测试是否成, 运行`npm run dev`,打开`index.html`

## 第六步 安装配置`webpack`开发环境插件
1. 安装`wepack-merge`，运行`npm install --save-dev webpack-merge`
2. 在`webpack.config`文件夹中新建`dev.js`，添加基本配置
  ```
    const path = require('path') // 引入path
    const webpack = require('webpack') // 引入webpack
    const merge = require('webpack-merge') // 引入webpack-merge
    const baseConfig = require('./base') // 引入基本配置
    const root = path.resolve(__dirname, '..')

    module.exports = merge(baseConfig, {
    })
  ```
3. 添加`webpack`的`dev-server`服务器，配置如下：
  ```
    devServer: {
      inline: true,  //实时编译
      port: 3000,
      progress: true, // 显示打包进度
      historyApiFallback: true
    }
  ```
4. 修改`package.json`中`script`的`dev`脚本：`"dev": "webpack-dev-server --config=webpack.config/dev.js"`
5. 在浏览器中打开`http://localhost:3000/`页面，显示`hello vue`，服务器配置成功!
6. 添加热替换插件`HotModuleReplacementPlugin`，在`dev.js`中添加如下配置:
  ```
    plugins: [
      new webpack.HotModuleReplacementPlugin() //webpack内部插件，不需要安装
    ]
  ```
7. 安装`HtmlWebpackPlugin`插件，运行`npm install --save-dev html-webpack-plugin`, 添加配置信息
  ```
    new HtmlWebpackPlugin({
      template: path.join(root, 'index.html'),
      inject: 'body'
    })
  ```
8. 修改`Home.vue`中的代码，测试成功!

## 第七步 安装配置`webpack`生产环境插件
1. 在`webpack.config`文件夹下添加`pro.js`文件, 并添加如下配置:
  ```
    const path = require('path')
    const webpack = require('webpack')
    const merge = require('webpack-merge')
    const baseConfig = require('./base')
    const root = path.resolve(__dirname, '..')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const ExtractTextPlugin = require('extract-text-webpack-plugin') 

    module.exports = merge(baseConfig, {
      plugins: [
        new HtmlWebpackPlugin({
          template: path.join(root, 'index.html'),
          inject: 'body'
        }),
        new ExtractTextPlugin("style.css"), // 需要安装
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
          sourceMap: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          filename: 'vendor-[hash].min.js'
        })
      ]
    })
  ```
2. 在`package.json`中的`script`添加脚本 `"build": "webpack --config=webpack.config/pro.js"`
3. 运行`npm run build`成功 