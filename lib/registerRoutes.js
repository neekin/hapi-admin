const fs = require('fs')
const path = require('path')
const routes = []
let filenames =fs.readdirSync('./routes')
filenames.forEach(file=>{
   const filepath =  path.resolve('./routes',file)
   routes.push(require(filepath))
})


module.exports = routes