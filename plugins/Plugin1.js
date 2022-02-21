class Plugin1 {
    apply(complier) {
        complier.hooks.emit.tap("Plugin1", (compilation) => {
            console.log('emit.tap 111')
        })

        complier.hooks.emit.tapAsync("Plugin1", (compilation, callback) => {
            setTimeout(() => {
                console.log('callback emit.tap 111')
                callback()
            }, 1000)
        })
        complier.hooks.afterEmit.tap("Plugin1", (compilation) => {
            console.log('afterEmit.tap 111')
        })
        complier.hooks.done.tap("Plugin1", (stats) => {
            console.log('done.tap 111')
        })
    }
}

module.exports = Plugin1