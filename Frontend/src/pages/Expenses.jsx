import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import {
  getExpenses,
  addExpense,
  editExpense,
  deleteExpense,
} from "../services/expenseService";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingExpense, setDeletingExpense] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    note: "",
  });

  const fetchExpenses = async (page = 1) => {
    try {
      setLoading(true);

      const response = await getExpenses(page, 3);

      setExpenses(response.data.expenses);
      setCurrentPage(response.data.currentPage);
      setLastPage(response.data.lastPage);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);

      toast.success("Expense deleted successfully");

      fetchExpenses(currentPage);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete expense");
    }
  };
  const handleAddExpense = async (e) => {
    e.preventDefault();

    try {
      const response = await addExpense({
        amount: Number(formData.amount),
        description: formData.description,
        note: formData.note,
      });

      toast.success("Expense added successfully");

      setFormData({
        amount: "",
        description: "",
        note: "",
      });

      setShowAddModal(false);

      fetchExpenses(1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to add expense");
    }
  };
  const handleEditExpense = async (e) => {
    e.preventDefault();

    try {
      await editExpense(editingExpense._id, {
        amount: Number(formData.amount),
        description: formData.description,
        note: formData.note,
      });

      toast.success("Expense updated successfully");

      setFormData({
        amount: "",
        description: "",
        note: "",
      });

      setEditingExpense(null);
      setShowAddModal(false);

      fetchExpenses(currentPage);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update expense");
    }
  };
  const handleDeleteExpense = async () => {
    if (!deletingExpense) return;

    try {
      await deleteExpense(deletingExpense._id);

      toast.success("Expense deleted successfully");

      setDeletingExpense(null);

      fetchExpenses(currentPage);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete expense");
    }
  };
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Expenses</h1>

            <p className="mt-2 text-zinc-400">
              Track and manage your expenses.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600"
          >
            <Plus size={20} />
            Add Expense
          </button>
        </div>

        {/* Expense List */}
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-6 text-xl font-semibold text-white">
            Recent Expenses
          </h2>

          {loading ? (
            <p className="py-10 text-center text-zinc-400">
              Loading expenses...
            </p>
          ) : expenses.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-zinc-400">No expenses found.</p>

              <p className="mt-2 text-sm text-zinc-500">
                Add your first expense to start tracking.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div
                  key={expense._id}
                  className="flex items-center justify-between rounded-2xl bg-zinc-800 p-4"
                >
                  <div>
                    <h3 className="font-semibold text-white">
                      {expense.description}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-400">
                      {expense.category}
                    </p>

                    {expense.note && (
                      <p className="mt-1 text-sm text-zinc-500">
                        {expense.note}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-5">
                    <p className="font-semibold text-red-400">
                      -₹{expense.amount}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingExpense(expense);

                        setFormData({
                          amount: expense.amount,
                          description: expense.description,
                          note: expense.note || "",
                        });

                        setShowAddModal(true);
                      }}
                      className="text-zinc-400 transition hover:text-blue-400"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(expense._id)}
                      className="text-zinc-400 transition hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Pagination */}
        {!loading && expenses.length > 0 && (
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="rounded-xl border border-zinc-700 px-4 py-2 text-zinc-300 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-sm text-zinc-400">
              Page {currentPage} of {lastPage}
            </span>

            <button
              type="button"
              disabled={currentPage === lastPage}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="rounded-xl border border-zinc-700 px-4 py-2 text-zinc-300 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
            <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {editingExpense ? "Edit Expense" : "Add Expense"}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-zinc-400 transition hover:text-white"
                >
                  <X size={22} />
                </button>
              </div>

              <p className="mt-2 text-zinc-400">
                {editingExpense
                  ? "Update your expense details."
                  : "Add a new expense to your tracker."}
              </p>

              <form
                onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
                className="mt-6 space-y-5"
              >
                {/* Amount */}
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    Amount
                  </label>

                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amount: e.target.value,
                      })
                    }
                    placeholder="Enter amount"
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-emerald-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    Description
                  </label>

                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    placeholder="e.g. Lunch at restaurant"
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-emerald-500"
                  />
                </div>

                {/* Note */}
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    Note
                  </label>

                  <textarea
                    value={formData.note}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        note: e.target.value,
                      })
                    }
                    placeholder="Optional note"
                    rows="3"
                    className="w-full resize-none rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-emerald-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="w-1/2 rounded-2xl border border-zinc-700 py-3 font-semibold text-zinc-300 transition hover:bg-zinc-800"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-1/2 rounded-2xl bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-600"
                  >
                    {editingExpense ? "Update Expense" : "Add Expense"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Expenses;
