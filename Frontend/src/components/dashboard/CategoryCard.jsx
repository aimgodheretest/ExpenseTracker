function CategoryCard() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-white">Top Categories</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-zinc-400">Food</span>

          <span className="text-white">$420</span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">Travel</span>

          <span className="text-white">$280</span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">Shopping</span>

          <span className="text-white">$200</span>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
