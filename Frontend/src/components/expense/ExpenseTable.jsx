import { Pencil, Trash2 } from "lucide-react";

const expenses = [
  {
    id: 1,
    title: "Netflix",
    category: "Entertainment",
    amount: 499,
    date: "08 Aug 2026",
  },
  {
    id: 2,
    title: "Pizza",
    category: "Food",
    amount: 650,
    date: "07 Aug 2026",
  },
  {
    id: 3,
    title: "Uber",
    category: "Travel",
    amount: 320,
    date: "07 Aug 2026",
  },
];

function ExpenseTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <table className="w-full">
        <thead className="border-b border-zinc-800 bg-zinc-800/40">
          <tr className="text-left text-sm uppercase tracking-wide text-zinc-400">
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
            >
              <td className="px-6 py-5 font-medium text-white">
                {expense.title}
              </td>

              <td className="px-6 py-5 text-zinc-300">{expense.category}</td>

              <td className="px-6 py-5 font-semibold text-emerald-400">
                ₹{expense.amount}
              </td>

              <td className="px-6 py-5 text-zinc-400">{expense.date}</td>

              <td className="px-6 py-5">
                <div className="flex justify-center gap-4">
                  <button className="text-zinc-400 transition hover:text-emerald-400">
                    <Pencil size={18} />
                  </button>

                  <button className="text-zinc-400 transition hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
