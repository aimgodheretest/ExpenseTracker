const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authentication");

const {
  buyPremium,
  updateTransactionStatus,
} = require("../controllers/purchaseController");

router.post("/purchase/premium", authenticate, buyPremium);
router.post(
  "/purchase/updatetransactionstatus",
  authenticate,
  updateTransactionStatus,
);

module.exports = router;
