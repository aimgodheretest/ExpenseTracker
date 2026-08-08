const Expense = require("../models/expenseTable");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const now = new Date();

    // Start of current month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Start of next month
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // Last 6 months
    const startOfSixMonths = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const [
      totalExpenseResult,
      monthlyExpenseResult,
      transactionCount,
      categoryBreakdown,
      recentExpenses,
      monthlyExpenses,
    ] = await Promise.all([
      // Total expenses
      Expense.aggregate([
        {
          $match: {
            user: userId,
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]),

      // Current month expenses
      Expense.aggregate([
        {
          $match: {
            user: userId,
            createdAt: {
              $gte: startOfMonth,
              $lt: startOfNextMonth,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]),

      // Total number of transactions
      Expense.countDocuments({
        user: userId,
      }),

      // Expenses grouped by category
      Expense.aggregate([
        {
          $match: {
            user: userId,
          },
        },
        {
          $group: {
            _id: "$category",
            total: { $sum: "$amount" },
          },
        },
        {
          $sort: {
            total: -1,
          },
        },
      ]),

      // Recent 5 expenses
      Expense.find({
        user: userId,
      })
        .sort({ createdAt: -1 })
        .limit(5),

      // Monthly expense trend
      Expense.aggregate([
        {
          $match: {
            user: userId,
            createdAt: {
              $gte: startOfSixMonths,
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            total: {
              $sum: "$amount",
            },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]),
    ]);

    const totalExpenses = totalExpenseResult[0]?.total || 0;

    const currentMonthExpenses = monthlyExpenseResult[0]?.total || 0;

    res.status(200).json({
      totalExpenses,
      currentMonthExpenses,
      transactionCount,

      categories: categoryBreakdown.map((item) => ({
        category: item._id || "Uncategorized",
        total: item.total,
      })),

      recentExpenses,

      monthlyExpenses: monthlyExpenses.map((item) => ({
        year: item._id.year,
        month: item._id.month,
        total: item.total,
      })),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch dashboard data",
    });
  }
};

module.exports = {
  getDashboard,
};
