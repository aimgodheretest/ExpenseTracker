const categories = [
  { name: "Food", amount: "₹6,200" },
  { name: "Travel", amount: "₹4,100" },
  { name: "Entertainment", amount: "₹3,800" },
  { name: "Shopping", amount: "₹2,400" },
];

function TopCategories() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-semibold text-white">Top Categories</h2>

      <div className="mt-6 space-y-4">
        {categories.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl bg-zinc-800 p-4"
          >
            <span className="text-zinc-300">{item.name}</span>

            <span className="font-semibold text-emerald-400">
              {item.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCategories;
