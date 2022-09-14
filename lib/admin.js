const AdminBroPlugin = require("@admin-bro/hapi");
const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
AdminBro.registerAdapter(AdminBroMongoose)
console.log('会调用执行吗？')
const ADMIN = {
    email: "admin",
    password: "admin",
    role: "admin",
};
const locale = {
    translations: {
      labels: {
        loginWelcome: "",
      },
      messages: {
        loginWelcome: "",
      },
    },
  };
  const branding = {
    companyName: "",
    softwareBrothers: false,
    logo: "",
  };
  const adminBroOptions = {
    locale,
    branding,
    auth: {
      authenticate: (email, password) => {
        if (ADMIN.email === email && ADMIN.password === password) {
          return ADMIN;
        }
        return null;
      },
      strategy: "session",
      cookieName: "hapi-admin",
      cookiePassword:
        process.env.COOKIE_PASSWORD || "FWnqrb9dQetxAFptS4hn4hEpRn54KrWc",
      isSecure: true, //only https requests
    }
  };
module.exports = {
    plugin:AdminBroPlugin,
    options:adminBroOptions
}