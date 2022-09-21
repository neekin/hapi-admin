const next = require('next')
const package = require('../../package.json')
const { nextHandlerWrapper } = require('../../utils/next-wrapper')
const webpack = require('../../utils/next-webpack')
const { defaultPagesDir } = require('../../utils/check_pages')
module.exports = {
  name: 'hapi-next',
  version: package.version,
  register: async (server, options)=> {
    const dev = process.env.NODE_ENV !== 'production'
    if(!options.dir){
      options.dir = defaultPagesDir()
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