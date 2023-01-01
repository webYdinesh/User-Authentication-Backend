const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userScheme = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Empty"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is Empty"],
    unique: true,
  },
  phone: {
    type: Number,
    required: [true, "Number is Empty"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Empty"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Password is Empty"],
  },
});

//hasing password
userScheme.pre("save", async function (next) {
  if (this.isModified(["password", "confirmPassword"]))
    this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
  next();
});

//user-model
module.exports = mongoose.model("userauth", userScheme);
