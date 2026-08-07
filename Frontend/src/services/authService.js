import api from "./api";

export const login = (data) => {
  return api.post("/auth/login", data);
};

export const signup = (data) => {
  return api.post("/auth/signup", data);
};

export const forgotPassword = (email) => {
  return api.post("/auth/forgot-password", {
    email,
  });
};
