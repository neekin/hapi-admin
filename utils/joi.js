const Joi = require("joi");


module.exports = {
  headers: () => {
    return Joi.object({
      authorization: Joi.string().required(),
    }).unknown();
  },
  getJoi: () => {
    return Joi
  }
}


