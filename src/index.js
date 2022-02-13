/**
 * webpack 入口文件
 * 1. 运行指令
 * 开发环境：webpack ./src/index.js -o ./build --mode=development
 * webpack会以./src/index.js为入口文件进行打包 打包后输出到./build目录下
 * 生产环境：webpack ./src/index.js -o ./build --mode=production
 */
import './index.css';
import data from './data.json'; // 打包后就是JSON.parse('字符串')
//import '@babel/polyfill';

console.log(data); // 注意目前webpack在生产环境打包之后会将下面代码直接打包成console.log(3)
// 变成先编译了？？？直接输出结果？？优化的和rollup差不多了

const add = function add(x, y) {
    return x + y;
}; // eslint-disable-next-line

console.log(add(1, 2));
const promise = new Promise((resolve) => {
    setTimeout(() => {
        console.log(11);
        resolve(12);
    }, 1000);
});
promise.then((result) => {
    console.log(result);
});
