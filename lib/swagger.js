const HapiSwagger = require("hapi-swagger");
const package = require('../package.json')
const swaggerOptions = {
  documentationPath: '/swagger',
  info: {
    title: "Test API Documentation",
    version: package.version,
  },
  // 定义接口以 tags 属性定义为分组
  grouping: "tags",
  
};

module.exports = {
  plugin: HapiSwagger,
  options: swaggerOptions,
};
