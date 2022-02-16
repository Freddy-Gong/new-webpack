//loader本质上是一个函数
// module.exports = function (content, map, meta) {
//     //console.log(content, map, meta)
//     console.log(111)
//     return content
// }
//同步的方式
module.exports = function (content, map, meta) {
    console.log(1111)

    this.callback(null, content, map, meta)
}

module.exports.pitch = function () {
    console.log('pitch 111')
}