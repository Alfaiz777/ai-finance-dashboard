import API from "./api";

// register
export const registerUser = async (data: any) => {
  const response = await API.post("/auth/register", data);

  localStorage.setItem("token", response.data.token);

  return response.data;
};

// login
export const loginUser = async (data: any) => {
  const response = await API.post("/auth/login", data);

  localStorage.setItem("token", response.data.token);

  return response.data;
};

//logout
export const logoutUser = () => {
  localStorage.removeItem("token");
};
