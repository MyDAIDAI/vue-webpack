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