const db = require("../utils/dbConnection");
const bcrypt = require("bcrypt");

const addUsers = async (req, res) => {
  const { name, email, password } = req.body;

  //1.check if user is already exists in db;
  const checkUser = `SELECT * FROM users WHERE email=?`;
  db.execute(checkUser, [email], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
      db.end();
      return;
    }
    if (result.length > 0) {
      res.status(400).json({
        message: `User already exists`,
      });
      return;
    }
  });

  try {
    //HASH PASSWORD
    const hashPassword = await bcrypt.hash(password, 10);
    //   2.INSERT NEW USER
    const signupQuary = `INSERT INTO users  (name,email,password) VALUES (?,?,?)`;
    db.execute(signupQuary, [name, email, hashPassword], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
        db.end();
        return;
      }

      console.log(`User Created for sign up`);
      res.status(201).json({
        message: "User created successfully",
        result,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating user",
    });
  }
};

module.exports = { addUsers };
