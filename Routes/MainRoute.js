const userRoute = require("./UserRoute");

const MainRouter = require("express").Router();

MainRouter.use("/user", userRoute);

module.exports = MainRouter;
