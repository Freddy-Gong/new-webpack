class Plugin2 {
    apply(complier) {
        complier.hooks.thisCompilation.tap('Plugin2', (compilation) => {
            compilation.hooks.additionalAssets.tapAsync('Plugin2', (cb) => {
                //debugger
                //console.log(compilation)

                const content = 'hello plugin2'
                //向输出的资源中添加一个a.txt
                compilation.assets['a.txt'] = {
                    //文件大小
                    size() {
                        return content.length
                    },
                    //文件内容
                    source() {
                        return content
                    }
                }
                cb()
            })
        })
    }
}

module.exports = Plugin2