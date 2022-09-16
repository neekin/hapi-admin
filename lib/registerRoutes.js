const fs = require('fs')
const path = require('path')
const routes = []
console.log('报错了吗')
let filenames =fs.readdirSync('./routes')
console.log(filenames)
filenames.forEach(file=>{
   const filepath =  path.resolve('./routes',file)
   routes.push(require(filepath))
})


module.exports = routes