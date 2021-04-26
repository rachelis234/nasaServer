const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkAuthUser = async (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(req.file)
  try {
    let userDecoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(userDecoded);
    let user = await User.findOne({
      email: userDecoded.email,
      password: userDecoded.password
    });
    if (user) {
      req.userId = user._id;
      next();
    } else {
      throw new error();
    }
  } catch (error) {
    res.status(401).json({
      message: "Auth failed"
    });
  }
};
module.exports = checkAuthUser;
