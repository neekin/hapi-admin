"use strict";
const pkg = require("./package");
const _ = require("lodash");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
// 引入依赖的插件
const adminPlugin = require("./lib/admin");
const jwtPlugin = require("./lib/jwt");
const swaggerPlugin = require("./lib/swagger");


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
    if(options.swaager){
      let swaagerOptions = _.merge(swaggerPlugin.options, options.swaager);
      swaggerPlugin.options = swaagerOptions;
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
    ]);
  },
};
