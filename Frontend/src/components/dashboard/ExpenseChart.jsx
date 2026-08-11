import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function ExpenseChart({ monthlyExpenses = [] }) {
  const data = monthlyExpenses.map((item) => ({
    month: new Date(item.year, item.month - 1).toLocaleString("default", {
      month: "short",
    }),
    expense: item.total,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid stroke="#3f3f46" strokeDasharray="4 4" />

        <XAxis dataKey="month" stroke="#a1a1aa" />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="expense"
          stroke="#10b981"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ExpenseChart;
