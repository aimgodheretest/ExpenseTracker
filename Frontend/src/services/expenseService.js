import api from "./api";

// Get Expenses
export const getExpenses = async (page = 1, limit = 10) => {
  const response = await api.get(
    `/expense/get-expenses?page=${page}&limit=${limit}`,
  );

  return response.data;
};

// Add Expense
export const addExpense = async (expense) => {
  const response = await api.post("/expense/add-expense", expense);

  return response.data;
};

// Update Expense
export const updateExpense = async (id, expense) => {
  const response = await api.put(`/expense/edit-expense/${id}`, expense);

  return response.data;
};

// Delete Expense
export const deleteExpense = async (id) => {
  const response = await api.delete(`/expense/delete-expense/${id}`);

  return response.data;
};
