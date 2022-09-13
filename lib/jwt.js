const jwt = require("jsonwebtoken");
exports.plugin = {
    name:"hapi-admin-jwt",
    register: async function (server, options) {
    const validate = async function (decoded, request, h) {
      if ("admin" != decoded.username) {
        return { isValid: false };
      } else {
        return { isValid: true };
      }
    };

    await server.register(require("hapi-auth-jwt2"));
    server.auth.strategy("jwt", "jwt", {
      key: "NeverShareYourSecret", // Never Share your secret key
      validate, // validate function defined above
    });

    server.auth.default("jwt");

    server.route([
      {
        method: "GET",
        path: "/gettesttoken",
        config: { auth: false },
        handler: function (request, h) {
          const TestToken = jwt.sign(
            {
              username: "admin",
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
            },
            "NeverShareYourSecret"
          );
          return { TestToken };
        },
      },
      {
        method: "GET",
        path: "/testtoken",
        config: { auth: "jwt" },
        handler: function (request, h) {
          const response = h.response({ text: "You used a Token!" });
          response.header("Authorization", request.headers.authorization);
          return response;
        },
      },
    ]);
  },
};


