const fs = require('fs')
const path = require('path')
const resources = []
const defaultVisibleProperties ={
    createdAt:{isVisible:{create:false,show:true,list:true}},
    updatedAt:{isVisible:{create:false,show:true}}
}
const modelspath = path.resolve('./models')
let filenames =fs.readdirSync(modelspath)
filenames.forEach(file=>{
   const filepath =  path.resolve('./models',file)
   let options = {}
   const resourceOtionsFile = path.resolve('./resources',file)
   if(fs.existsSync(resourceOtionsFile)){
    options = require(resourceOtionsFile)
    if(options.properties){
        options.properties = {...defaultVisibleProperties,...options.properties}
    }
   }
   resources.push({
    resource:require(filepath),
    options:{
        properties:{...defaultVisibleProperties},
        ...options
    }
   })
})

module.exports = resources