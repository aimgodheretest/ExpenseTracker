import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Food", value: 6200 },
  { name: "Travel", value: 4200 },
  { name: "Shopping", value: 3100 },
  { name: "Entertainment", value: 2500 },
];

const COLORS = ["#10b981", "#06b6d4", "#f59e0b", "#ef4444"];

function CategoryChart() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 h-105">
      <h2 className="text-xl font-semibold text-white">Category Breakdown</h2>

      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={65} outerRadius={100} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CategoryChart;
