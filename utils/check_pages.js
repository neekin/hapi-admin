const path = require('path')
const fs = require('fs')

const modulesPagesPath = path.join(path.resolve(__dirname,'../'))
const projectPagesPath = path.resolve('.')

module.exports ={
    defaultPagesDir(){
        const projectHasPagesDir =   fs.existsSync(path.join(projectPagesPath,'./pages')) || fs.existsSync(path.join(projectPagesPath,'./src/pages'))
        return projectHasPagesDir ? projectPagesPath: modulesPagesPath
    }
}