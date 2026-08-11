function RecentTransactions({ recentExpenses = [] }) {
  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold text-white">
        Recent Transactions
      </h2>

      <div className="space-y-4">
        {recentExpenses.length === 0 ? (
          <p className="text-zinc-500">No transactions yet.</p>
        ) : (
          recentExpenses.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between rounded-xl bg-zinc-800 p-4"
            >
              <p className="text-white">{item.description}</p>

              <p className="font-semibold text-red-400">-₹{item.amount}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentTransactions;
