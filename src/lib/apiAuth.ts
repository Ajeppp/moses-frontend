import { api } from "./api";

export const loginApi = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const registerApi = async (name: string, email: string, password: string) => {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data;
};

export const getMeApi = async () => {
  const res = await api.get("/api/me");
  return res.data;
};
