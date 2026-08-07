const jwt = require("jsonwebtoken");
const User = require("../models/usersTable");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message: "Token not provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      message: "Authentication failed",
    });
  }
};

module.exports = authenticate;
