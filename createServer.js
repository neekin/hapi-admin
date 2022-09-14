const Hapi = require('@hapi/hapi')
const _ = require('lodash')
module.exports = function(options){
    const initOptions={
        port:3000,
        host:"localhost"
    }

    const serverOptions=_.merge(initOptions,options)

    const server = Hapi.server(serverOptions)
    return server
}