const next = require('next')
const path = require('path')
const package = require('../../package.json')
const { nextHandlerWrapper } = require('../../utils/next-wrapper')
const webpack = require('../../utils/next-webpack')
module.exports = {
  name: 'hapi-next',
  version: package.version,
  register: async (server, options)=> {
    const dev = process.env.NODE_ENV !== 'production'
    const dir =options.dir ? options.dir : path.join(path.resolve(__dirname,'../../'))
    const app = next({
      dev,
      dir,
      conf:{
        reactStrictMode: true,
        webpack5: true,
        amp: false,
        poweredByHeader: false,
        experimental: {
          forceSwcTransforms: false,
        },
        webpack
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