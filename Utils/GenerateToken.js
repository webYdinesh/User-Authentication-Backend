const jwt = require("jsonwebtoken");
//Generate Token
exports.generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.COOKIE_SCREAT_KEY, {
    expiresIn: "30 day",
  });
};
