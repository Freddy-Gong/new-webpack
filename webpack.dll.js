/**
 * 使用dll技术，对某些库进行单独打包
 * 当运行webpack时，默认查找webpack.config.js文件
 * webpack --config webpack.dll.js
 */

const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
    //最终打包生成的[name] --》jquery
    //['jquery'] 要打包的库时jquery
    entry: {
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_[hash]' //打包的库里面向外暴露出去的内容叫什么名字
    },
    plugins: [
        //打包生成一个manifest.json-->提供和js的映射
        new webpack.DllPlugin({
            name: '[name]_[hash]', //输出的库和原本的库名的映射
            path: resolve(__dirname, 'dll/manifest.json'),//输出文件
        })
    ],
    mode: 'production'
}