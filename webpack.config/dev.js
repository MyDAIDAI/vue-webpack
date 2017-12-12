const path = require('path') // 引入path
const webpack = require('webpack') // 引入webpack
const merge = require('webpack-merge') // 引入webpack-merge
const baseConfig = require('./base') // 引入基本配置
const root = path.resolve(__dirname, '..')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseConfig, {
  devServer: {
    inline: true,  //实时编译
    port: 3000,
    progress: true, // 显示打包进度
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(root, 'index.html'),
      inject: 'body'
    })
  ]
})