const Joi = require("joi");


module.exports = {
  headers: () => {
    Joi.object({
      authorization: Joi.string().required(),
    }).unknown();
  },
  getJoi: () => {
    return Joi
  }
}


