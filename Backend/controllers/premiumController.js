const Expense = require("../models/expenseTable");

const showLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Expense.aggregate([
      {
        $group: {
          _id: "$user",
          totalExpense: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          totalExpense: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          name: "$user.name",
          totalExpense: 1,
        },
      },
    ]);

    res.status(200).json(leaderboard);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching leaderboard",
    });
  }
};

module.exports = {
  showLeaderboard,
};
