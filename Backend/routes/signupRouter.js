const express = require("express");
const router = express.Router();

router.post("/auth/signup", (req, res) => {
  const { name, email, password } = req.body;
  res.json({ message: "User created successfully" });
});

module.exports = router;
