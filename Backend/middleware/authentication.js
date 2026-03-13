const jwt = require("jsonwebtoken");
const User = require("../models/usersTable");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log("Token--->", token);

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const decoded = jwt.verify(token, "secretkey");

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // important line

    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authenticate;
