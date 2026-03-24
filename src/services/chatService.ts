import API from "./api";

export const getChatHistory = async () => {
  const response = await API.get("/chat-history");
  return response.data;
};
