const transactions = [
  {
    title: "Starbucks",
    amount: "-$18",
  },
  {
    title: "Salary",
    amount: "+$2200",
  },
  {
    title: "Netflix",
    amount: "-$12",
  },
];

function RecentTransactions() {
  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold text-white">
        Recent Transactions
      </h2>

      <div className="space-y-4">
        {transactions.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl bg-zinc-800 p-4"
          >
            <p className="text-white">{item.title}</p>

            <p
              className={`font-semibold ${
                item.amount.startsWith("+")
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {item.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTransactions;
