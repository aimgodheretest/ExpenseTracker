function TopCategories({ categories = [] }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-semibold text-white">Top Categories</h2>

      <div className="mt-6 space-y-4">
        {categories.length === 0 ? (
          <p className="text-zinc-500">No expenses yet.</p>
        ) : (
          categories.slice(0, 5).map((item) => (
            <div
              key={item.category}
              className="flex items-center justify-between rounded-xl bg-zinc-800 p-4"
            >
              <span className="text-zinc-300">{item.category}</span>

              <span className="font-semibold text-emerald-400">
                ₹{item.total}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TopCategories;
