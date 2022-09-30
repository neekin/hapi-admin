const next = require('next')
const package = require('../../package.json')
const { nextHandlerWrapper } = require('../../utils/next-wrapper')
const withHapiAdmin = require('../../utils/next-webpack')
const { defaultPagesDir ,defaultConfig } = require('../../utils/check_pages')

module.exports = {
  name: 'hapi-next',
  version: package.version,
  register: async (server, options)=> {
    if(!options.conf){
      options.conf = defaultConfig()
    }
   
    const dev = process.env.NODE_ENV !== 'production'
    if(!options.dir){
      options.dir = defaultPagesDir()
    }
    const config = withHapiAdmin(options.conf)
    const hostname = options?.host ?? 'localhost'
    const port =options?.port ?? 3000
    const app = next({
      dev,
      dir:options.dir,
      conf:config,
      hostname,
      port

    });
    app.prepare().then(() =>{
      server.route({
        method: 'GET',
        options:{auth:false},
        path: '/_next/{p*}' /* next specific routes */,
        handler: nextHandlerWrapper(app),
      })
      server.route({
          method:"*",
          options:{auth:false},
          path: `/{path*}`,
          handler:nextHandlerWrapper(app)
      })
    })
  }
}