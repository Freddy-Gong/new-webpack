const Plugin1 = require('./Plugin1')

const CopyWebpackPlugin = require('./CopyWebpackPlugin')
module.exports = {
    plugins: [
        new Plugin1()
        //new Plugin2()
        // new CopyWebpackPlugin({
        //     from: 'public',
        //     to: 'css',
        //     ignore: ['**/index.html']
        // })
    ],
    mode: 'development'
}