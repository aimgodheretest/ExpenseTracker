const express = require("express");
const router = express.Router();

const { addUsers } = require("../controllers/signupController");

router.post("/auth/signup", addUsers);

module.exports = router;
