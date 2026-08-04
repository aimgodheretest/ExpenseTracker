const axios = require("axios");
const Order = require("../models/orderTable");

// Load Cashfree credentials
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;

/*
=========================================================
FUNCTION: buyPremium
=========================================================
*/
const buyPremium = async (req, res) => {
  try {
    // Generate unique order id
    const orderId = "order_" + Date.now();

    // Save order in MongoDB
    await Order.create({
      orderId,
      status: "PENDING",
      user: req.user._id,
    });

    const orderData = {
      order_id: orderId,
      order_amount: 1000,
      order_currency: "INR",

      customer_details: {
        customer_id: "user_" + req.user._id,
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
      orderId,
    });
  } catch (error) {
    console.log("CASHFREE ERROR --->", error.response?.data || error);

    res.status(500).json({
      message: "Unable to create payment order",
    });
  }
};

/*
=========================================================
FUNCTION: updateTransactionStatus
=========================================================
*/
const updateTransactionStatus = async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    // Update Order
    await Order.findOneAndUpdate(
      { orderId },
      {
        paymentId,
        status: "SUCCESSFUL",
      },
    );

    // Update User
    req.user.isPremium = true;
    await req.user.save();

    res.status(200).json({
      message: "Transaction Successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Transaction Failed",
    });
  }
};

module.exports = {
  buyPremium,
  updateTransactionStatus,
};
