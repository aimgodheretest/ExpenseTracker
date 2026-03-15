const express = require("express");
const router = express.Router();
const {
  addExpense,
  getExpenses,
  deleteExpense,
  editExpense,
} = require("../controllers/expenseController");
const authenticate = require("../middleware/authentication");
const { showLeaderboard } = require("../controllers/purchaseController");

router.post("/add-expense", authenticate, addExpense);
router.get("/get-expenses", authenticate, getExpenses);
router.delete("/delete-expense/:id", authenticate, deleteExpense);
router.put("/edit-expense/:id", authenticate, editExpense);
router.get("/leaderboard", authenticate, showLeaderboard);

module.exports = router;
