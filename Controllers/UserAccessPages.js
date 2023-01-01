const user = require("../Models/User.model");
exports.PageAccess = async (req, res) => {
  try {
    const userinfo = await user
      .findById({ _id: req.userId })
      .select(["-password", "-confirmPassword"]);

    res.status(200).json({
      status: 200,
      message: "Data Sent Successfully",
      userinfo,
    });
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: error,
    });
  }
};
