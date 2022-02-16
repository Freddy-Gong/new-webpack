const { resolve } = require("path/posix");

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                //loader: 'loader1'
                use: [
                    'loader1',
                    'loader2',
                    {
                        loader: 'loader3',
                        options: {
                            name: 'jack'
                        }
                    }
                ]
                //探讨执行顺序问题，显然是倒序执行
                //pitch函数是顺序执行
                //不知道为甚么 loader执行了两遍
            }
        ]
    },
    //配置loader解析规则
    resolveLoader: {
        modules: ['node_module', resolve(__dirname, 'loaders')]
    },
    mode: 'development'
}