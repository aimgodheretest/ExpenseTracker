import api from "./api";

export const addExpense = (data) => {
  return api.post("/expense/add-expense", data);
};

export const getExpenses = (page = 1, limit = 3) => {
  return api.get(`/expense/get-expenses?page=${page}&limit=${limit}`);
};

export const editExpense = (id, data) => {
  return api.put(`/expense/edit-expense/${id}`, data);
};

export const deleteExpense = (id) => {
  return api.delete(`/expense/delete-expense/${id}`);
};
