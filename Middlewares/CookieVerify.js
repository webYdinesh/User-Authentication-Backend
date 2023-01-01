const jwt = require("jsonwebtoken");
exports.cookieVerifyMiddleware = (req, res, next) => {
  const cookie = req.headers.cookie;
  if (!cookie) {
    return res.status(404).json({
      status: 404,
      message: "Something went wrong",
    });
  }
  const splitCookie = String(cookie).split("=")[1];

  jwt.verify(splitCookie, process.env.COOKIE_SCREAT_KEY, (error, success) => {
    if (error) {
      return res.status(404).json({
        status: 404,
        message: error,
      });
    }
    req.userId = success.id;
  });
  next();
};
