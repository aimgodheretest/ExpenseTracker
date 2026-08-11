function MonthlySummary({ reportData = [], loading }) {
  const totalExpenses = reportData.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0,
  );

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-2xl font-semibold text-white">Monthly Reports</h2>

      <table className="mt-6 w-full">
        <thead className="border-b border-zinc-800 text-left text-zinc-400">
          <tr>
            <th className="py-4">Month</th>
            <th>Total Expenses</th>
            <th>Transactions</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b border-zinc-800">
            <td className="py-5 text-white">August</td>

            <td className="font-semibold text-emerald-400">
              {loading ? "Loading..." : `₹${totalExpenses.toFixed(2)}`}
            </td>

            <td className="text-zinc-300">
              {loading ? "Loading..." : reportData.length}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MonthlySummary;
