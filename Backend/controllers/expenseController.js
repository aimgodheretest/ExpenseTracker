const Expense = require("../models/expenseTable");

//CREATE EXPENSE
const addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;

    const expense = await Expense.create({
      amount,
      description,
      category,
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
};
//GETALL EXPENSE
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json(error);
  }
};
//DELETE EXPENSE
const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;

    await Expense.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: `Expense with id:${id} Deleted`,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
//EDIT EXPENSE
const editExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, category } = req.body;

    await Expense.update({ amount, description, category }, { where: { id } });

    res.status(200).json({
      message: "Expense updated successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { addExpense, getExpenses, deleteExpense, editExpense };
