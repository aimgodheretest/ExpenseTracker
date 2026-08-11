import api from "./api";

export const createPremiumOrder = () => {
  return api.post("/purchase/premium");
};

export const updateTransactionStatus = (orderId) => {
  return api.post("/purchase/updatetransactionstatus", {
    orderId,
  });
};
