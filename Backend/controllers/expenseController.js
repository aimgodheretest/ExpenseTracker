const Expense = require("../models/expenseTable");
const { getCategoryFromAI } = require("../utils/aiService");

// CREATE EXPENSE
const addExpense = async (req, res) => {
  try {
    const { amount, description, note } = req.body;

    const category = await getCategoryFromAI(description);

    const expense = await Expense.create({
      amount,
      description,
      category,
      note,
      user: req.user._id,
    });

    res.status(201).json(expense);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding expense",
    });
  }
};

// GET EXPENSES
const getExpenses = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;

    const skip = (page - 1) * limit;

    const count = await Expense.countDocuments({
      user: req.user._id,
    });

    const expenses = await Expense.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      expenses,
      currentPage: page,
      hasNextPage: page * limit < count,
      nextPage: page + 1,
      hasPreviousPage: page > 1,
      previousPage: page - 1,
      lastPage: Math.ceil(count / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// DELETE EXPENSE
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    await Expense.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    res.status(200).json({
      message: `Expense with id:${id} Deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// EDIT EXPENSE
const editExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, note } = req.body;

    const category = await getCategoryFromAI(description);

    const expense = await Expense.findOneAndUpdate(
      {
        _id: id,
        user: req.user._id,
      },
      {
        amount,
        description,
        category,
        note,
      },
      {
        new: true,
      },
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense updated successfully",
      expense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
  editExpense,
};
