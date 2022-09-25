const path = require('path')
const fs = require('fs')

const modulesPagesPath = path.join(path.resolve(__dirname,'../'))
const projectPagesPath = path.resolve('.')

module.exports ={
    defaultPagesDir(){
        const projectHasPagesDir = fs.existsSync(path.join(projectPagesPath,'./src/pages')) ||  fs.existsSync(path.join(projectPagesPath,'./pages')) 
        return projectHasPagesDir ? projectPagesPath: modulesPagesPath
    },
    defaultConfig(){
        const nextConfigPath =path.join(projectPagesPath,'./next.config.js')
        return fs.existsSync(nextConfigPath) ?  require(path.join(projectPagesPath,'./next.config.js')) : {}
    }
}