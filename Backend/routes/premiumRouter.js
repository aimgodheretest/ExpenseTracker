const express = require("express");
const router = express.Router();

const { showLeaderboard } = require("../controllers/premiumController");
const authenticate = require("../middleware/authentication");
const premiumAuthentication = require("../middleware/premiumAuthentication");

router.get(
  "/leaderboard",
  authenticate,
  premiumAuthentication,
  showLeaderboard,
);

module.exports = router;
