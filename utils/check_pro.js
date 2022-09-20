const fs = require('fs')
const path = require('path')

module.exports ={
    checkSimple(){
        const file = path.resolve('./node_modules/hapi-admin-simple')
        return fs.existsSync(file)
    },
    checkPro(){
        const file = path.resolve('./node_modules/hapi-admin-pro')
        return fs.existsSync(file)
    }
}