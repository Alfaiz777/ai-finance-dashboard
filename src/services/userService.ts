import API from "./api";

//get profile

export const getUserProfile = async () => {
  const response = await API.get("/user/profile");

  return response.data;
};

// update income

export const updateIncome = async (income: number) => {
  const response = await API.put("/user/income", {
    monthlyIncome: income,
  });

  return response.data;
};

export const updateProfile = async (data: { name: string }) => {
  const res = await API.put("/user/update-profile", data);
  return res.data;
};
