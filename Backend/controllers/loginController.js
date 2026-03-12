const db = require("../utils/dbConnection");
const bcrypt = require("bcrypt");

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const findUser = `SELECT * FROM users WHERE email=?`;

  db.execute(findUser, [email], async (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
      return;
    }

    //1.User Not Found;
    if (result.length === 0) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const user = result[0];

    //2.Password Check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }
    //3.Login Success
    console.log("Login successfull");
    res.status(200).json({
      message: "User login successful",
    });
  });
};

module.exports = { loginUser };
