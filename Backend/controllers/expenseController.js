const Expense = require("../models/expenseTable");

//CREATE EXPENSE
const addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;

    const expense = await Expense.create({
      amount,
      description,
      category,
      userId: req.user.id, // attach logged in user
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET ALL EXPENSES OF LOGGED IN USER
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: {
        userId: req.user.id, // show only this user's expenses
      },
    });

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
        userId: req.user.id, // only owner can delete
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

    await Expense.update(
      { amount, description, category },
      {
        where: {
          id,
          userId: req.user.id, // only owner can edit
        },
      },
    );

    res.status(200).json({
      message: "Expense updated successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { addExpense, getExpenses, deleteExpense, editExpense };
