const Expense = require("../models/expenseTable");
const sequelize = require("../utils/dbConnection");
const { getCategoryFromAI } = require("../utils/aiService");

// CREATE EXPENSE
const addExpense = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { amount, description } = req.body;

    const category = await getCategoryFromAI(description);

    const expense = await Expense.create(
      {
        amount,
        description,
        category,
        userId: req.user.id,
      },
      { transaction: t },
    );

    await t.commit();

    res.status(201).json(expense);
  } catch (error) {
    await t.rollback();

    console.log(error);
    res.status(500).json({ message: "Error adding expense" });
  }
};

// GET EXPENSES (NO TRANSACTION)
const getExpenses = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 3;

    const offset = (page - 1) * limit;

    const { count, rows } = await Expense.findAndCountAll({
      where: { userId: req.user.id },
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      expenses: rows,
      currentPage: page,
      hasNextPage: limit * page < count,
      nextPage: page + 1,
      hasPreviousPage: page > 1,
      previousPage: page - 1,
      lastPage: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE EXPENSE (FIXED WITH TRANSACTION)
const deleteExpense = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const id = req.params.id;

    const expense = await Expense.findOne({
      where: {
        id,
        userId: req.user.id,
      },
      transaction: t,
    });

    if (!expense) {
      await t.rollback();

      return res.status(404).json({
        message: "Expense not found",
      });
    }

    await Expense.destroy({
      where: {
        id,
        userId: req.user.id,
      },
      transaction: t,
    });

    await t.commit();

    res.status(200).json({
      message: `Expense with id:${id} Deleted`,
    });
  } catch (error) {
    await t.rollback();

    res.status(500).json(error);
  }
};

// EDIT EXPENSE
const editExpense = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { amount, description } = req.body;

    const category = await getCategoryFromAI(description);

    await Expense.update(
      { amount, description, category },
      {
        where: {
          id,
          userId: req.user.id,
        },
        transaction: t,
      },
    );

    await t.commit();

    res.status(200).json({
      message: "Expense updated successfully",
    });
  } catch (error) {
    await t.rollback();

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
