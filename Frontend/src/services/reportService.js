import api from "./api";

export const getReport = () => {
  return api.get("/report");
};
