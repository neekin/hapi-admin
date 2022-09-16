const path =require('path')
const HapiSwagger = require("hapi-swagger");
const package = require(path.resolve('./package.json'))
const swaggerOptions = {
  documentationPath: '/swagger',
  info: {
    title: package.name,
    version: package.version,
    description:package.description || '项目信息'
  },
  // 定义接口以 tags 属性定义为分组
  grouping: "tags",
  
};

module.exports = {
  plugin: HapiSwagger,
  options: swaggerOptions,
};
