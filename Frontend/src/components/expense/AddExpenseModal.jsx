import Button from "../ui/Button";
import Input from "../ui/Input";

function AddExpenseModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-white">Add Expense</h2>

        <p className="mt-2 text-zinc-400">Record a new expense.</p>

        <div className="mt-8 space-y-5">
          <Input type="number" placeholder="Amount" />

          <Input type="text" placeholder="Description" />

          <select className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none">
            <option>Select Category</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Entertainment</option>
          </select>

          <Input type="date" />
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-6 py-3 text-zinc-300 transition hover:bg-zinc-800"
          >
            Cancel
          </button>

          <Button>Save Expense</Button>
        </div>
      </div>
    </div>
  );
}

export default AddExpenseModal;
