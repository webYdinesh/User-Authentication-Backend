const { PageAccess } = require("../Controllers/UserAccessPages");
const {
  userRegister,
  userLogin,
  logoutUser,
} = require("../Controllers/UserAuth");
const { cookieVerifyMiddleware } = require("../Middlewares/CookieVerify");
const {
  usercredentialVerify,
  loginCredentialVerify,
} = require("../Middlewares/UserCredentialVerify");

const userRoute = require("express").Router();
userRoute.post("/new", usercredentialVerify, userRegister);
userRoute.post("/login", loginCredentialVerify, userLogin);
userRoute.get("/userinfo", cookieVerifyMiddleware, PageAccess);
userRoute.post("/logout", cookieVerifyMiddleware, logoutUser);

module.exports = userRoute;
