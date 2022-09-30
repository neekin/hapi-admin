const path = require("path");
const package = require(path.resolve("./package.json"));
const renderHtml = {
  login: (message) => {
    return `
      <html><head><title>Login page</title></head><body>
      ${message ? "<h3>" + message + "</h3><br></a>" : ""}
      <form method="post" action="/login">
        Username: <input type="text" name="username"><br>
        Password: <input type="password" name="password"><br></a>
      <input type="submit" value="Login"></form>
      </body></html>
        `;
  },
  home: (name) => {
    return `
      <html><head><title>Login page</title></head><body>
      <h3>Welcome ${name}! You are logged in!</h3>
      <form method="get" action="/logout">
        <input type="submit" value="Logout">
      </form>
      </body></html>
        `;
  },
};
const users = [
  {
    id: 1,
    name: "admin",
    password: "password",
  },
];
exports.plugin = {
  name: "hapi-admin-cookie",
  register: async function (server, options) {
    
    const COOKIE_SECRET =
      options?.COOKIE_SECRET ?? "OrkicXrzrM7N5FYipucpVO3Fluotx14x";
    const loginPageRoot = options?.redirectTo ?? "/login";
    const show_test_case = options.testcase ?? true;
    const name = options?.COOKIE_NAME ?? package?.name ?? "hapi-admin-cookie";
    const validateFunc =
      options?.validate ??
      async function (request, session) {
        const account = users.find((user) => user.id === session.id);
        if (!account) {
          return { valid: false };
        }
        return { valid: true, credentials: account };
      };
    await server.register(require("@hapi/cookie"));
    server.auth.strategy("session", "cookie", {
      cookie: {
        name,
        password: COOKIE_SECRET,
        isSecure: process.env.NODE_ENV === "production",
        path: '/'
      },
      redirectTo: loginPageRoot,
      validateFunc,
    });

    server.auth.default("session");
    if (show_test_case) {
      server.route([
        {
          method: "GET",
          path: "/logged",
          handler: (request, h) => {
            return renderHtml.home(request.auth.credentials.name);
          },
        },
        {
          method: "GET",
          path: "/login",
          options: {
            auth: false,
            plugins: {
              cookie: {
                redirectTo: false,
              },
            },
          },
          handler: async (request, h) => {
            if (request.auth.isAuthenticated) {
              return h.redirect("/logged");
            }

            return renderHtml.login();
          },
        },
        {
          method: "POST",
          path: "/login",
          options: {
            auth: false,
          },
          handler: async (request, h) => {
            const { username, password } = request.payload;
            if (!username || !password) {
              return renderHtml.login("Missing username or password");
            }
            const account = users.find(
              (user) => user.name === username && user.password === password
            );

            if (!account) {
              return renderHtml.login("Invalid username or password");
            }

            request.cookieAuth.set({ id: account.id });
            return h.redirect("/logged");
          },
        },
        {
          method: "GET",
          path: "/logout",
          handler: (request, h) => {
            request.cookieAuth.clear();
            return h.redirect("/logged");
          },
        },
      ]);
    }
  },
};
