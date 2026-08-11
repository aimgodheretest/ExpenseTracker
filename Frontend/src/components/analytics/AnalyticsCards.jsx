function Card({ title, value }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm text-zinc-400">{title}</p>

      <h2 className="mt-3 text-3xl font-bold text-emerald-400">{value}</h2>
    </div>
  );
}

function AnalyticsCards({ dashboardData, loading }) {
  const totalExpenses = dashboardData?.totalExpenses || 0;

  const transactionCount = dashboardData?.transactionCount || 0;

  const averageExpense =
    transactionCount > 0 ? totalExpenses / transactionCount : 0;

  const highestExpense =
    dashboardData?.recentExpenses?.length > 0
      ? Math.max(
          ...dashboardData.recentExpenses.map(
            (expense) => Number(expense.amount) || 0,
          ),
        )
      : 0;

  return (
    <div className="grid grid-cols-4 gap-6">
      <Card
        title="Total Spending"
        value={loading ? "Loading..." : `₹${totalExpenses.toFixed(2)}`}
      />

      <Card
        title="Average Expense"
        value={loading ? "Loading..." : `₹${averageExpense.toFixed(2)}`}
      />

      <Card
        title="Highest Expense"
        value={loading ? "Loading..." : `₹${highestExpense.toFixed(2)}`}
      />

      <Card
        title="Transactions"
        value={loading ? "Loading..." : transactionCount}
      />
    </div>
  );
}

export default AnalyticsCards;
