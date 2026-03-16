const express = require("express");
const router = express.Router();

const { showLeaderboard } = require("../controllers/premiumController");
const authenticate = require("../middleware/authentication");

router.get("/leaderboard", authenticate, showLeaderboard);

module.exports = router;
