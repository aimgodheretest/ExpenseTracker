function Card({ title, value }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm text-zinc-400">{title}</p>

      <h2 className="mt-3 text-3xl font-bold text-emerald-400">{value}</h2>
    </div>
  );
}

function ReportCards({ reportData = [], loading }) {
  const totalExpenses = reportData.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0,
  );

  return (
    <div className="grid grid-cols-3 gap-6">
      <Card
        title="Total Expenses"
        value={loading ? "Loading..." : `₹${totalExpenses.toFixed(2)}`}
      />

      <Card title="Current Month" value={loading ? "Loading..." : "August"} />

      <Card
        title="Transactions"
        value={loading ? "Loading..." : reportData.length}
      />
    </div>
  );
}

export default ReportCards;
