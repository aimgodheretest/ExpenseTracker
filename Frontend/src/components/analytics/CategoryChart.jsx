import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#10b981", "#06b6d4", "#f59e0b", "#ef4444"];

function CategoryChart({ categories = [] }) {
  const data = categories.map((item) => ({
    name: item.category,
    value: item.total,
  }));

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 h-105">
      <h2 className="text-xl font-semibold text-white">Category Breakdown</h2>

      <div className="mt-6 h-80">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-zinc-500">No expenses yet.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={65}
                outerRadius={100}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default CategoryChart;
