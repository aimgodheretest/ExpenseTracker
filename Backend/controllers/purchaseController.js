const axios = require("axios");
const Order = require("../models/orderTable");

// Load Cashfree credentials
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;

/*
FUNCTION: buyPremium
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

      order_meta: {
        return_url: `${process.env.FRONTEND_URL}/payment-success?order_id={order_id}`,
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
FUNCTION: updateTransactionStatus
*/
const updateTransactionStatus = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        message: "Order ID is required",
      });
    }

    // Ask Cashfree for the payment status
    const response = await axios.get(
      `https://sandbox.cashfree.com/pg/orders/${orderId}/payments`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-client-id": CASHFREE_APP_ID,
          "x-client-secret": CASHFREE_SECRET_KEY,
          "x-api-version": "2022-09-01",
        },
      },
    );

    const payments = response.data;

    console.log("Cashfree payment response:", payments);

    if (!payments || payments.length === 0) {
      return res.status(400).json({
        message: "Payment not found",
      });
    }

    const successfulPayment = payments.find(
      (payment) => payment.payment_status === "SUCCESS",
    );

    if (!successfulPayment) {
      return res.status(400).json({
        message: "Payment was not successful",
      });
    }

    // Update Order
    await Order.findOneAndUpdate(
      {
        orderId,
        user: req.user._id,
      },
      {
        paymentId:
          successfulPayment.cf_payment_id || successfulPayment.payment_id,

        status: "SUCCESSFUL",
      },
    );

    // Update User
    req.user.isPremium = true;

    await req.user.save();

    res.status(200).json({
      message: "Transaction Successful",
      isPremium: true,
    });
  } catch (error) {
    console.log(
      "PAYMENT VERIFICATION ERROR --->",
      error.response?.data || error,
    );

    res.status(500).json({
      message: "Unable to verify transaction",
    });
  }
};

module.exports = {
  buyPremium,
  updateTransactionStatus,
};
