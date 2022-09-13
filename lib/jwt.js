const jwt = require("jsonwebtoken");
const Joi = require("joi");
const HapiAuthJwt = require("hapi-auth-jwt2");
const headers = require("../utils/header");
exports.plugin = {
  name: "hapi-admin-jwt",
  register: async function (server, options) {
    const JWT_SECRET = options.JWT_SECRET || "NeverShareYourSecret";
    const validate = async function (decoded, request, h) {
      if ("admin" != decoded.username) {
        return { isValid: false };
      } else {
        return { isValid: true };
      }
    };

    await server.register(HapiAuthJwt);

    server.auth.strategy("jwt", "jwt", {
      key: JWT_SECRET, // Never Share your secret key
      validate, // validate function defined above
      verifyOptions: { algorithms: ["HS256"] },
    });

    server.auth.default("jwt");

    server.route([
      {
        method: "GET",
        path: "/gettesttoken",
        options: { tags: ["api", "tests"], auth: false, validate: {} },

        handler: function (request, h) {
          const TestToken = jwt.sign(
            {
              username: "admin",
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
            },
            JWT_SECRET
          );
          return { TestToken };
        },
      },
      {
        method: "GET",
        path: "/testtoken",
        options: {
          auth: "jwt",
          validate: {
            query: Joi.object({
              token: Joi.string(),
            }),
            headers,
          },
          tags: ["api", "tests"],
        },
        handler: function (request, h) {
          const response = h.response({ text: "You used a Token!" });
          response.header("Authorization", request.headers.authorization);
          return response;
        },
      },
    ]);
  },
};
