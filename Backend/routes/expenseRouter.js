const express = require("express");
const router = express.Router();
const {
  addExpense,
  getExpenses,
  deleteExpense,
  editExpense,
} = require("../controllers/expenseController");

router.post("/add-expense", addExpense);
router.get("/get-expenses", getExpenses);
router.delete("/delete-expense/:id", deleteExpense);
router.put("/edit-expense/:id", editExpense);

module.exports = router;
