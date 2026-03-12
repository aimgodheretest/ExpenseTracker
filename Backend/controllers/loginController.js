const User = require("../models/usersTable");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
    });

    // user not found
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // password check
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      message: "User login successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Login error",
    });
  }
};

module.exports = { loginUser };
