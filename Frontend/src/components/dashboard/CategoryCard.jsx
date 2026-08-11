function CategoryCard({ categories = [] }) {
  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold text-white">Top Categories</h2>

      <div className="space-y-4">
        {categories.length === 0 ? (
          <p className="text-zinc-500">No expenses yet.</p>
        ) : (
          categories.slice(0, 3).map((item) => (
            <div key={item.category} className="flex justify-between">
              <span className="text-zinc-400">{item.category}</span>

              <span className="text-white">₹{item.total}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryCard;
