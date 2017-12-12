const path = require('path') // 引入node.js中的path模块，处理文件与目录路径
// 获取文件路径 _dirname为当前文件所在路径，join将其拼接为路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: resolve('src/main.js'), // 打包入口文件
  output: {
    path: resolve('dist'), // 打包出口目录
    filename: 'main.js' // 出口文件名
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'views': resolve('src/views')
    },
    extensions: ['.js', '.vue'] // 引用js和vue文件可以省略后缀名
  },
  module: {
    loaders: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {test: /\.vue$/, loader: 'vue-loader'},
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
    ]
  }
}