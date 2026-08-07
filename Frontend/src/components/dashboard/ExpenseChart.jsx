import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", expense: 420 },
  { month: "Feb", expense: 680 },
  { month: "Mar", expense: 520 },
  { month: "Apr", expense: 840 },
  { month: "May", expense: 610 },
  { month: "Jun", expense: 920 },
];

function ExpenseChart() {
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
