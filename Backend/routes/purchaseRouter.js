const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authentication");

const {
  buyPremium,
  updateTransactionStatus,
  showLeaderboard,
} = require("../controllers/purchaseController");

router.post("/purchase/premium", authenticate, buyPremium);
router.post(
  "/purchase/updatetransactionstatus",
  authenticate,
  updateTransactionStatus,
);
router.get("/premium/showLeaderBoard", authenticate, showLeaderboard);

module.exports = router;
