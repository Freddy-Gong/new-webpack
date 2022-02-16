const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')
const schema = require('./schema.json')
//如何获取loader的options对象以及校验
module.exports = function (content, map, meta) {
    const options = this.getOptions(schema)
    console.log(3333, options)//同时获取了options和校验
    return content
}

module.exports.pitch = function () {
    console.log('pitch 222')
}