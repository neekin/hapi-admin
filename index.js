'use strict';
const pkg = require('./package.json')
const AdminBroPlugin = require('@admin-bro/hapi')

exports.plugin = {
    pkg,
    register: async function (server, options) {
        const ADMIN = {
            email: 'text@example.com',
            password: 'password',
            role: 'admin'
        }
        const adminBroOptions = {
            auth: {
                authenticate: (email, password) => {
                  if (ADMIN.email === email && ADMIN.password === password) {
                    return ADMIN
                  }
                  return null
                },
                strategy: 'session',
                cookieName: 'hapi-admin',
                cookiePassword: process.env.COOKIE_PASSWORD || 'FWnqrb9dQetxAFptS4hn4hEpRn54KrWc',
                isSecure: true, //only https requests
              },
              ...options
            }

        await server.register({
            plugin: AdminBroPlugin,
            options: adminBroOptions,
         })
         
    }
};