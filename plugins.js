"use strict";
const pkg = require("./package")
const _ = require("lodash")
const Inert = require("@hapi/inert")
const Vision = require("@hapi/vision")
// 引入依赖的插件
const adminPlugin = require("./lib/admin")
const jwtPlugin = require("./lib/jwt")
const swaggerPlugin = require("./lib/swagger")
const resources = require('./lib/registerResouces')
const routes = require('./lib/registerRoutes')
exports.plugin = {
  pkg,
  register: async function (server, options) {
    const  registerJwtPlugin ={
      plugin: jwtPlugin,
      options:{}
    }
    if (options.admin) {
      let adminOptions = _.merge(adminPlugin.options, options.admin);
      adminPlugin.options = adminOptions;
    }
    console.log(resources)
    if(!adminPlugin.options.resources){
      adminPlugin.options.resources=resources
    }else{
      adminPlugin.options.resources = _.merge(resources,adminPlugin.options.resources)
    }
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
      adminPlugin,
      swaggerPlugin,
      registerJwtPlugin,
      ...routes
    ]);
  },
};
