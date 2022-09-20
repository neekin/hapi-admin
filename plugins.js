"use strict";
const pkg = require("./package");
const _ = require("lodash");

const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");

// 引入依赖的插件
const jwtPlugin = require("./lib/plugins/jwt");
const swaggerPlugin = require("./lib/plugins/swagger");

const routes = require("./lib/plugins/registerRoutes");
const next = require("./lib/plugins/next");
const { checkPro ,checkSimple } = require("./utils/check_pro");
exports.plugin = {
  pkg,
  register: async function (server, options) {
    const registerJwtPlugin = {
      plugin: jwtPlugin,
      options: {},
    };
    const nextPlugin = {
      plugin: next,
      options: {},
    };
    if (options.next) {
      let nextOptions = _.merge(nextPlugin.options, options.next);
      nextPlugin.options = nextOptions;
    }
    if (options.swagger) {
      let swaggerOptions = _.merge(swaggerPlugin.options, options.swagger);
      swaggerPlugin.options = swaggerOptions;
    }
    if (options.jwt) {
      let jwtOptions = _.merge(registerJwtPlugin.options, options.jwt);
      registerJwtPlugin.options = jwtOptions;
    }
    if(checkSimple() && !checkPro()){
      await server.register({
       plugin:   require('hapi-admin-simple'),
       options
      })
    }
    await server.register([
      Inert,
      Vision,
      swaggerPlugin,
      registerJwtPlugin,
      nextPlugin,
      ...routes
    ]);


  },
};
