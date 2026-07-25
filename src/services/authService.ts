import API from "./api";

// register
export const registerUser = async (data: any) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

// login
export const loginUser = async (data: any) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

//logout
export const logoutUser = async () => {
  const response = await API.post("/auth/logout");
  return response.data;
};
