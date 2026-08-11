import api from "./api";

export const getLeaderboard = () => {
  return api.get("/premium/leaderboard");
};
