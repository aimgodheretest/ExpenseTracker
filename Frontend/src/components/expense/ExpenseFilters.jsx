import Input from "../ui/Input";

function ExpenseFilters() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="flex flex-wrap gap-4">
        <Input type="text" placeholder="Search expenses..." className="w-72" />

        <select className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none">
          <option>All Categories</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
        </select>

        <select className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
          <option>This Year</option>
        </select>
      </div>

      <select className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none">
        <option>Newest First</option>
        <option>Oldest First</option>
        <option>Highest Amount</option>
        <option>Lowest Amount</option>
      </select>
    </div>
  );
}

export default ExpenseFilters;
