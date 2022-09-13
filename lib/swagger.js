const HapiSwagger = require("hapi-swagger");

const swaggerOptions = {
  info: {
    title: "Test API Documentation",
    version: 1.0,
  },
};

module.exports = {
  plugin: HapiSwagger,
  options: swaggerOptions,
};
