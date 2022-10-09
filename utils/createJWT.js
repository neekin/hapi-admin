const jwt = require("jsonwebtoken");

const defaultExp = Math.floor(Date.now() / 1000) + 60 * 60;
module.exports = (obj={username:'test'}, JWT_SECRET='NeverShareYourSecret', exp = defaultExp) => {
  return jwt.sign(
    {
      ...obj,
      exp,
    },
    JWT_SECRET
  );
};
