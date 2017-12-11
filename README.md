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