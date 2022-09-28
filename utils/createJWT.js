const jwt = require("jsonwebtoken");

const defaultExp = Math.floor(Date.now() / 1000) + 60 * 60;
module.exports = (username, JWT_SECRET='NeverShareYourSecret', exp = defaultExp) => {
  return jwt.sign(
    {
      username,
      exp,
    },
    JWT_SECRET
  );
};
