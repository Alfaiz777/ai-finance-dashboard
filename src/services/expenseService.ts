import API from "./api";

// get expenses
export const getExpenses = async () => {
  const response = await API.get("/expenses");

  return response.data;
};

// create expense
export const createExpense = async (expenseData: any) => {
  const response = await API.post("/expenses", expenseData);

  return response.data;
};

// delete expense
export const deleteExpense = async (id: string) => {
  const response = await API.delete(`/expenses/${id}`);

  return response.data;
};
