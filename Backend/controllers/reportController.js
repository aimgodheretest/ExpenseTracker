const Expense = require("../models/expenseTable");
const { Op } = require("sequelize");

const getReport = async (req, res) => {
  try {
    const userId = req.user.id;
    const type = req.query.type || "monthly";

    let whereClause = { userId };

    if (type === "monthly") {
      const now = new Date();

      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

      whereClause.createdAt = {
        [Op.gte]: start,
        [Op.lt]: end,
      };
    }

    const expenses = await Expense.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(expenses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch report" });
  }
};

module.exports = { getReport };
