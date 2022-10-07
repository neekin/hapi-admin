const Hapi = require('@hapi/hapi')
const _ = require('lodash')
const createJSONWebToken = require('./utils/createJWT')

const {headers , getJoi} = require('./utils/joi')
module.exports ={
    createServer:async function(options={}){
        const host = process.env.NODE_ENV === "production" ?'0.0.0.0':'localhost'
        const initOptions={
            port:3000,
            host
        }
        const serverOptions=_.merge(initOptions,options.server)
        const server = Hapi.server(serverOptions)
        await server.register({plugin:require('./plugins'),options:{...options}})
        return server
    },
    createJSONWebToken,
    headers,
    getJoi
} 