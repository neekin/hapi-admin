const fs = require('fs')
const path = require('path')

module.exports = ()=>{
    const file = path.resolve('./node_modules/hapi-admin-pro')
    return fs.existsSync(file)
}
// fs.existsSync(__dirname,'node_modules')