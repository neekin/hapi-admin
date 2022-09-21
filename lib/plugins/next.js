const next = require('next')
const path = require('path')
const fs = require('fs')
const package = require('../../package.json')
const { nextHandlerWrapper } = require('../../utils/next-wrapper')
const webpack = require('../../utils/next-webpack')
module.exports = {
  name: 'hapi-next',
  version: package.version,
  register: async (server, options)=> {
    const dev = process.env.NODE_ENV !== 'production'
    if(!options.dir){
      const modulesPath =  path.join(path.resolve(__dirname,'../../'))
      const projectPath = path.resolve('.')
      const projectHasPagesDir = fs.existsSync(path.join(projectPath,'./pages')) || fs.existsSync(path.join(projectPath,'./src/pages'))
      const dir = projectHasPagesDir ? projectPath:modulesPath
      options.dir = dir
    }
    const app = next({
      dev,
      dir:options.dir,
      conf:{
        webpack,
       ...options.conf,
      }
    });
    app.prepare().then(() =>{
        server.route({
            method:"GET",
            options:{auth:false},
            path: `/{path*}`,
            handler:nextHandlerWrapper(app)
        })
    })
  }
}