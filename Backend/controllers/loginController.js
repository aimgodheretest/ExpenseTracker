const User = require("../models/usersTable");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        isPremium: user.isPremium,
      },
      process.env.JWT_SECRET,
    );

    res.status(200).json({
      message: "User login successful",
      token,
      isPremium: user.isPremium,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Login error",
    });
  }
};

module.exports = { loginUser };
