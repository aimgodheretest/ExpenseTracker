const User = require("../models/usersTable");
const bcrypt = require("bcrypt");

const addUsers = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check existing user
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      result: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating user",
    });
  }
};

module.exports = { addUsers };
