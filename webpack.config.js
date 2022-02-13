/**
 * webpack配置文件
 * src的代码还要经过编译，而配置文件就不会再次编译，所以
 * 因为所有的构建工具都是基于node的所以首先默认是commonjs
 * 但是node对ES6的支持不知道怎么样了，所以试一试
 * loader 下载 配置
 * plugin 下载 引入 配置
 */
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//plugin是一个构造函数
//设置node环境变量
//process.env.NODE_ENV = 'development'

// "browserslist": {
//      开发环境：-设置node的环境变量 process.env.NODE_ENV=development    
//     "development": [
//       "last 1 chrome version",
//       "last 1 firefox version",
//       "last 1 safari version"
//     ],
//      生产环境：默认是看生产环境的
//     "production": [
//       ">0.2%",
//       "no dead",
//       "not op_mini all"
//     ]
//   }
module.exports = {
    //webpack配置
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'build')
    },
    //loader配置
    module: {
        rules: [
            //每一种文件要用不同的loader
            {//test用来匹配文件
                test: /\.css$/,
                //使用哪些loader
                use: [
                    //所以是css-loader先生效style-loader后生效
                    //创建style标签，将js中的样式资源插入，添加到head中生效
                    //'style-loader',
                    //因为要吧css文件提取出来，所以要用下面的loader取代style-loader
                    MiniCssExtractPlugin.loader,
                    //将css文件变成commonjs加载到js中，里面的内容是样式字符串
                    'css-loader',
                    /**
                     * css兼容性处理：postcss postcss-loader postcss-preset-env
                     * 帮postcss找到package.json中的browserslist里面的配置，从而加载css兼容性样式
                     */
                    'postcss-loader'//对其配置变为外部文件的形式
                ]

            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    //将less转为css，在经过css-loader和style-loader
                    'less-loader',
                ]
            },
            //处理图片  
            {
                test: /\.(png|jpg|gif)$/,
                type: 'asset'
                //如果只使用一个loader就用下面这个属性
                //url-loader依赖于file-loader
                //loader: 'url-loader',
                //用来对上述loader进行配置
                // options: {
                //     //图片体积大小小于8kb，就会被转化为base64
                //     //优点；减少请求数量，减轻服务器压力
                //     //缺点：图片体积会更大，所以不会让体积本来就大的图片转换为base64
                //     limit: 8 * 1024,
                //     esModule: false,
                // }
            },//但是这个loader不能处理html中的img图片，不会改变打包后的路径
            //所以要用到下面这个loader
            {
                test: /\.html$/,
                //处理html文件的img图片 负责引入img，从而能被url-loader进行处理
                loader: 'html-loader'//已经产出ES6模式了
            },
            // {   //排除css js html资源
            //     exclude: /\.(css|js|html)$/,
            //     loader:'file-loader'
            // }
            /**
             * 语法检查：eslint-loader eslint
             * 注意：只检查自己的代码 不检查第三方库的
             * 检查规则，在package.json设置eslintconfig
             * 使用airbnb的模版
             * 
             * 当一个文件要被多个loader处理 一定要规定好顺序
             * 属性enforce表示优先处理'pre'最优先
             */
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     enforce: 'pre'
            //     loader: 'eslint-loader',
            //     options: {
            //         //自动修复
            //         fix: true
            //     }
            // },
            /**
             * js兼容性处理 babel-loader
             * 1.基本的js兼容性处理 @bable/preset-env
             * 2.全部的js兼容性处理 @babel/polyfill 体积太大了 没法精确的进行兼容
             * 3.按需加在兼容性处理 core-js
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    //指示babel做怎样的兼容性处理
                    //presets: ['@babel/preset-env']
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                //按需加载
                                useBuiltIns: 'usage',
                                //指定core-js版本
                                corejs: {
                                    version: 3
                                },
                                //指定兼容性做到那个版本浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    // optimization: {
    //     minimizer: [
    //         //webpack5不能下载optimize-css-assert-webpack-plugin
    //         //所以使用css-minimizer-webpack-plugin代替
    //         new CssMinimizerPlugin(),//压缩单独取出的css
    //     ],
    // },
    plugins: [
        //功能：会自动创建一个空的HTML 自动引入打包生成的所有资源js/css
        new HTMLWebpackPlugin({
            //以一下html文件为模版，创建一个html文件并自动引入打包生成的所有资源js/css
            //如果不配置就是空的html文件
            template: './src/index.html',
            minify: {//压缩HTML文件
                //移除空格
                collapseWhitespace: true,
                //移除注释
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            //对打包出来的css文件重命名
            filename: 'css/build.css'
        })
    ],
    //生产环境会自动压缩js文件
    mode: 'development',

    //开发服务器devServer 只会在内存中编译 不会有输出
    //webpack-dev-server
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'build'),
        },
        //contentBase:path.resolve(__dirname, 'build')
        //被上面那种写法替换了
        //启动gzip压缩
        compress: true,
        port: 3000,
        open: true
    }
}