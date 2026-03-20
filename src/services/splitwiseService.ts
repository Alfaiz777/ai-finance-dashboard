import API from "./api";

export const getDebts = async () => {
  const response = await API.get("/splitwise/debts");
  return response.data;
};

export const createDebt = async (debtData: any) => {
  const response = await API.post("/splitwise/debts", debtData);
  return response.data;
};

export const deleteDebt = async (id: string) => {
  const response = await API.delete(`/splitwise/debts/${id}`);
  return response.data;
};
