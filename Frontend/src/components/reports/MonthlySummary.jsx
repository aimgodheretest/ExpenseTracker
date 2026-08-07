const reports = [
  {
    month: "August",
    expenses: "₹18,450",
    downloads: 12,
  },
  {
    month: "July",
    expenses: "₹15,900",
    downloads: 8,
  },
  {
    month: "June",
    expenses: "₹20,100",
    downloads: 15,
  },
];

function MonthlySummary() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-2xl font-semibold text-white">Monthly Reports</h2>

      <table className="mt-6 w-full">
        <thead className="border-b border-zinc-800 text-left text-zinc-400">
          <tr>
            <th className="py-4">Month</th>
            <th>Total Expenses</th>
            <th>Downloads</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((item) => (
            <tr key={item.month} className="border-b border-zinc-800">
              <td className="py-5 text-white">{item.month}</td>

              <td className="text-emerald-400 font-semibold">
                {item.expenses}
              </td>

              <td className="text-zinc-300">{item.downloads}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MonthlySummary;
