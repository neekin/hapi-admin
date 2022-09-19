const next = require('next')
const package = require('../../package.json')
const { nextHandlerWrapper } = require('../../utils/next-wrapper')
const path = require('path')
module.exports = {
  name: 'hapi-next',
  version: package.version,
  register: async (server, options)=> {
    const dev = process.env.NODE_ENV !== 'production'
    const dir = path.join(path.resolve(__dirname,'../../'),'pages')
    console.log(dir,33333333)
    const app = next({
      dev,
      dir
    });
    const rootPath = options.rootPath || '/admin'
    // const handle = app.getRequestHandler()
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