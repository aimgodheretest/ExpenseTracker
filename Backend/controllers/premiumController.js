const Expense = require("../models/expenseTable");
const User = require("../models/usersTable");
const sequelize = require("../utils/dbConnection");

/*
=================================================
FUNCTION: showLeaderboard
WHEN IT RUNS:
→ When premium user clicks "Show Leaderboard"

WHAT IT DOES:
1. Calculates total expense per user
2. Joins Users table to get username
3. Sorts users by highest expense
=================================================
*/

const showLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Expense.findAll({
      attributes: [
        "userId",
        [sequelize.fn("SUM", sequelize.col("amount")), "totalExpense"],
      ],

      group: ["userId"],

      order: [[sequelize.literal("totalExpense"), "DESC"]],

      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    res.status(200).json(leaderboard);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
};

module.exports = {
  showLeaderboard,
};
