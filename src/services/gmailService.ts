import API from "./api";

export const syncGmail = async () => {
  const response = await API.post("/gmail/sync");
  return response.data;
};
