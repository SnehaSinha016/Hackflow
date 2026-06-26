import api from "./axios";

/* Generate AI Ideas */

export const generateIdeas = async (data) => {
  const response = await api.post("/ai/ideas", data);
  return response.data;
};

/* User already has an idea */

export const generateManualProject = async (data) => {
  const response = await api.post("/ai/manual-project", data);
  return response.data;
};

/* User selected an AI-generated idea */

export const generateAIProject = async (idea) => {
  const response = await api.post("/ai/generated-project", {
    idea,
  });

  return response.data;
};