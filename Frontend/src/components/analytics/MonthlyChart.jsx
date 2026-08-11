import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function MonthlyChart({ monthlyExpenses = [] }) {
  const data = monthlyExpenses.map((item) => ({
    month: new Date(item.year, item.month - 1).toLocaleString("default", {
      month: "short",
    }),
    amount: item.total,
  }));

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 h-105">
      <h2 className="text-xl font-semibold text-white">Monthly Expenses</h2>

      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#3f3f46" strokeDasharray="4 4" />

            <XAxis dataKey="month" stroke="#a1a1aa" />

            <YAxis stroke="#a1a1aa" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#10b981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyChart;
