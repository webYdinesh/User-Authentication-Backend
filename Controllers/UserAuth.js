const user = require("../Models/User.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../Utils/GenerateToken");
//user register controller
exports.userRegister = async (req, res) => {
  try {
    const newUser = await user.create(req.body);
    res.status(201).json({
      status: true,
      message: "New User Created",
      newUser,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(404)
        .json({ status: 404, message: "Email already Exist" });
    }
  }
};

//user Login controller

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await user.findOne({ email: email });
    //if Not Exist
    if (!existingUser) {
      return res.status(404).json({
        status: 404,
        message: "Email or Password Incorrrect",
      });
    }
    //if user Exist
    //Now Verify Password
    const verifyPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    //if Password incorrect
    if (!verifyPassword) {
      return res.status(401).json({
        status: 401,
        message: "Email or Password Incorrrect",
      });
    }
    //if Password CORRECT
    const token = generateToken(existingUser._id);
    res.header({
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers": "*",
    });
    res.cookie(String(existingUser._id), token, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
    });
    res.status(200).json({
      status: 200,
      message: "Login Successfully",
      token,
      existingUser,
    });
  } catch (error) {
    console.log(error);
  }
};

//user Logout Controller
exports.logoutUser = (req, res) => {
  res.clearCookie(req.userId);

  res.status(200).json({
    message: "Logout Successfully",
  });
};
