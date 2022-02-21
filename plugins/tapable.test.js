const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require('tapable')

class Lesson {
    constructor() {
        //初始化钩子容器
        this.hooks = {
            //同步hooks 任务会依次执行
            //go: new SyncHook(['address'])//会执行tap里面的全部函数
            go: new SyncBailHook(['address']),//一旦某个函数有返回值就不继续执行了，直接退出

            //异步hooks
            //AsyncParallelHook：异步并行
            //leave: new AsyncParallelHook(['name', 'age'])
            //AsyncSeriesHook:异步串行
            leave: new AsyncSeriesHook(['name', 'age'])

        }
    }
    tap() {
        //往kooks容器中注册事件/添加回调函数
        this.hooks.go.tap('class0318', (address) => {
            console.log('class0318', address)
            return 111
        })
        this.hooks.go.tap('class0410', (address) => {
            console.log('class0410', address)
        })
        this.hooks.leave.tapAsync('class0510', (name, age, callback) => {
            setTimeout(() => {
                console.log('class0510', name, age)
                callback()//调用之后才能继续执行
            }, 2000)
        })
        this.hooks.leave.tapPromise('class0610', (name, age) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('class0610', name, age)
                    resolve()//调用之后才能继续执行
                }, 1000)
            })
        })
    }

    start() {
        //触发hooks
        this.hooks.go.call('c318')
        this.hooks.leave.callAsync('jack', 19, function () {
            //代表所有leave容器中的函数出发晚了，才触发
            console.log('end~~~~~')
        })
    }
}

const l = new Lesson()
l.tap()
l.start()