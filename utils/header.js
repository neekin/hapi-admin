const Joi = require("joi");

module.exports = Joi.object({
  authorization: Joi.string().required(),
}).unknown();
