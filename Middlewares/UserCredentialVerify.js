exports.usercredentialVerify = (req, res, next) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 400,
      message: "Name is empty",
    });
  }
  if (!email || !email.includes("@")) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Email",
    });
  }
  if (!phone) {
    return res.status(400).json({
      status: 400,
      message: "phone number is empty",
    });
  }
    if (phone.length !== 10) {
    return res.status(400).json({
      status: 400,
      message: "phone number must have 10 digits",
    });
  }
  if (!password) {
    return res.status(400).json({
      status: 400,
      message: "Password slot is empty.",
    });
  }
  if (!(password === confirmPassword)) {
    return res.status(400).json({
      status: 400,
      message: "Password is not matching.",
    });
  }
  if (!name || !email || !phone || !password || !confirmPassword) {
    return res.status(400).json({
      status: 404,
      message: "Form Is Blanked.",
    });
  }
  next();
};

exports.loginCredentialVerify = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({
      status: 400,
      message: "Email is Empty",
    });
  }
  if (!password) {
    return res.status(400).json({
      status: 400,
      message: "Password is Empty",
    });
  }
  next();
};
