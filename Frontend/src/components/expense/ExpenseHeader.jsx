import Button from "../ui/Button";

function ExpenseHeader({ onAddExpense }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">Expenses</h1>

        <p className="mt-2 text-zinc-400">
          Manage and organize your daily expenses.
        </p>
      </div>

      <Button onClick={onAddExpense}>+ Add Expense</Button>
    </div>
  );
}

export default ExpenseHeader;
