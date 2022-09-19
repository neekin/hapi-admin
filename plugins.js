"use strict";
const pkg = require("./package")
const _ = require("lodash")
const Inert = require("@hapi/inert")
const Vision = require("@hapi/vision")
// 引入依赖的插件
// const adminPlugin = require("./lib/plugins/admin")
const jwtPlugin = require("./lib/plugins/jwt")
const swaggerPlugin = require("./lib/plugins/swagger")
// const resources = require('./lib/plugins/registerResouces')
const routes = require('./lib/plugins/registerRoutes')
const next = require('./lib/plugins/next')
exports.plugin = {
  pkg,
  register: async function (server, options) {
    const  registerJwtPlugin ={
      plugin: jwtPlugin,
      options:{}
    }
    const nextPlugin = {
      plugin:next,
      options:{}
    }
    if(options.next){
      let nextOptions = _.merge(nextPlugin.options, options.next);
      nextPlugin.options = nextOptions;
    }
    // if (options.admin) {
    //   let adminOptions = _.merge(adminPlugin.options, options.admin);
    //   adminPlugin.options = adminOptions;
    // }
    // if(!adminPlugin.options.resources){
    //   adminPlugin.options.resources=resources
    // }else{
    //   adminPlugin.options.resources = _.merge(resources,adminPlugin.options.resources)
    // }
    if(options.swagger){
      let swaggerOptions = _.merge(swaggerPlugin.options, options.swagger);
      swaggerPlugin.options = swaggerOptions;
    }
    if(options.jwt){
      let jwtOptions = _.merge(registerJwtPlugin.options, options.jwt);
      registerJwtPlugin.options = jwtOptions
    }

    await server.register([
      Inert,
      Vision,
      // adminPlugin,
      swaggerPlugin,
      registerJwtPlugin,
      nextPlugin,
      ...routes
    ]);
  },
};
