function Card({ title, value }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm text-zinc-400">{title}</p>

      <h2 className="mt-3 text-3xl font-bold text-emerald-400">{value}</h2>
    </div>
  );
}

function AnalyticsCards() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <Card title="Total Spending" value="₹18,450" />
      <Card title="Average Expense" value="₹615" />
      <Card title="Highest Expense" value="₹2,800" />
      <Card title="Transactions" value="42" />
    </div>
  );
}

export default AnalyticsCards;
