const Expense = require("../models/expenseTable");

const getReport = async (req, res) => {
  try {
    const userId = req.user._id;
    const type = req.query.type || "monthly";

    let whereClause = { user: userId };

    if (type === "monthly") {
      const now = new Date();

      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

      whereClause.createdAt = {
        $gte: start,
        $lt: end,
      };
    }

    const expenses = await Expense.find(whereClause).sort({
      createdAt: -1,
    });

    res.status(200).json(expenses);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to fetch report",
    });
  }
};

module.exports = {
  getReport,
};
