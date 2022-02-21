const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const webpack = require('webpack')

const readFile = promisify(fs.readFile)
const { RawSource } = webpack.sources

class CopyWebpackPlugin {
    constructor(options = {}) {
        //验证options是否符合规范 和loader一样可以用schema-utils去验证
        this.options = options
    }
    apply(complier) {
        complier.hooks.thisCompilation.tap('CopyWebpackPlugin', (compilation) => {
            // 添加资源的hooks
            compilation.hooks.additionalAssets.tapAsync('CopyWebpackPlugin', async (cb) => {
                //将from中的资源复制到to中，输出出去
                const { from, ignore } = this.options
                const to = this.options.to ? this.options.to : '.'
                //1.读取from中所有资源
                //context就是webpack配置
                //运行指令的目录
                const context = complier.options.context//process.cwd()
                //将from变为绝对路径
                const absoluteFrom = path.isAbsolute(from) ? from : path.resolve(context, from)//判断from是否为绝对路径
                //globby(要处理的文件夹，options)
                //const paths = await globby(absoluteFrom, { ignore })
                let paths = ''
                import('globby').then(async ({ globby }) => {
                    //2.过滤掉忽略的文件
                    paths = await globby(absoluteFrom, { ignore })
                    console.log(paths)
                    const files = await Promise.all(
                        paths.map(async (AbsolutePath) => { //map并不会接收async关键字 解决办法用Promi.all包起来
                            const content = await readFile(AbsolutePath)
                            const relativePath = path.basename(AbsolutePath)
                            //和to路径结合
                            const filename = path.join(to, relativePath)
                            return {
                                filename,
                                content
                            }
                        })
                    )
                    console.log(files)
                    //3.生产webpack格式的资源
                    const assets = files.map((file) => {
                        const source = new RawSource(file.content)
                        return {
                            ...file,
                            content: source
                        }
                    })
                    console.log(assets)
                    //4.添加到compilation中，输出出去
                    assets.forEach((asset) => {
                        compilation.emitAsset(asset.filename, asset.content)
                    })
                    cb()
                })
            })
        })
    }
}

module.exports = CopyWebpackPlugin