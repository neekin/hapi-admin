const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const HapiAuthJwt = require("hapi-auth-jwt2");
const headers = require("../utils/header");
exports.plugin = {
  name: "hapi-admin-jwt",
  register: async function (server, options) {
    const JWT_SECRET = options.JWT_SECRET || "NeverShareYourSecret";
    const show_test_case = options.testcase || true;
    const route = [];

    const validate =
      options.validate ||
      async function (decoded, request, h) {
        if ("test" != decoded.username) {
          return { isValid: false };
        } else {
          return { isValid: true };
        }
      };

    await server.register(HapiAuthJwt);

    server.auth.strategy("jwt", "jwt", {
      key: JWT_SECRET,
      validate,
      verifyOptions: { algorithms: ["HS256"] },
    });

    server.auth.default("jwt");

    if (show_test_case) {
      route.push({
        method: "GET",
        path: "/gettesttoken",
        options: { tags: ["api", "tests"], auth: false, validate: {} },

        handler: function (request, h) {
          const TestToken = jwt.sign(
            {
              username: "test",
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
            },
            JWT_SECRET
          );
          return { TestToken };
        },
      });

      route.push({
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
      });
    }
    server.route([...route]);
  },
};
