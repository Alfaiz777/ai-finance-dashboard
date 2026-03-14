import API from "./api";

export const askAI = async (question: string) => {
  const response = await API.post("/ai/chat", {
    message: question,
  });

  return response.data;
};
