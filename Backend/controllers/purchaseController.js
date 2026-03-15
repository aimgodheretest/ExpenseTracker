const axios = require("axios");
const Order = require("../models/orderTable");
const User = require("../models/usersTable");

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;

const buyPremium = async (req, res) => {
  try {
    const orderId = "order_" + Date.now();

    await Order.create({
      orderId: orderId,
      status: "PENDING",
      UserId: req.user.id,
    });

    const orderData = {
      order_id: orderId,
      order_amount: 1000,
      order_currency: "INR",

      customer_details: {
        customer_id: "user_" + req.user.id,
        customer_email: req.user.email,
        customer_phone: "9999999999",
      },
    };

    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/orders",
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          "x-client-id": CASHFREE_APP_ID,
          "x-client-secret": CASHFREE_SECRET_KEY,
          "x-api-version": "2022-09-01",
        },
      },
    );

    res.status(200).json({
      payment_session_id: response.data.payment_session_id,
      orderId: orderId,
    });
  } catch (error) {
    console.log("CASHFREE ERROR --->", error.response?.data || error);
    res.status(500).json(error);
  }
};

/* UPDATE TRANSACTION STATUS */

const updateTransactionStatus = async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    await Order.update(
      {
        paymentId: paymentId,
        status: "SUCCESSFUL",
      },
      { where: { orderId: orderId } },
    );

    await User.update({ isPremium: true }, { where: { id: req.user.id } });

    res.status(200).json({ message: "Transaction Successful" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { buyPremium, updateTransactionStatus };
