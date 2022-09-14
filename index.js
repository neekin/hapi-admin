const Hapi = require('@hapi/hapi')
const _ = require('lodash')
module.exports ={
    createServer:async function(options={}){
        const initOptions={
            port:3000,
            host:"localhost"
        }
        const serverOptions=_.merge(initOptions,options.server)
        const server = Hapi.server(serverOptions)
        await server.register({plugin:require('./plugins'),options:{...options}})
        return server
    }
} 