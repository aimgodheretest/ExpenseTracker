const axios = require("axios");
const Order = require("../models/orderTable");
const User = require("../models/usersTable");

// Load Cashfree credentials from .env file
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;

/*
=========================================================
FUNCTION: buyPremium
WHEN IT RUNS:
→ When user clicks "Buy Premium Membership" button

WHAT IT DOES:
1. Creates an order in our database with PENDING status
2. Sends request to Cashfree API to create payment order
3. Returns payment_session_id to frontend so payment page opens
=========================================================
*/
const buyPremium = async (req, res) => {
  try {
    // Generate unique order id
    const orderId = "order_" + Date.now();

    // Store order in database with PENDING status
    await Order.create({
      orderId: orderId,
      status: "PENDING",
      UserId: req.user.id,
    });

    // Order details that will be sent to Cashfree
    const orderData = {
      order_id: orderId,
      order_amount: 1000,
      order_currency: "INR",

      // Customer information required by Cashfree
      customer_details: {
        customer_id: "user_" + req.user.id,
        customer_email: req.user.email,
        customer_phone: "9999999999",
      },
    };

    // API call to Cashfree to create payment order
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
    // Send payment session id to frontend
    res.status(200).json({
      payment_session_id: response.data.payment_session_id,
      orderId: orderId,
    });
  } catch (error) {
    // Print detailed error if payment order creation fails
    console.log("CASHFREE ERROR --->", error.response?.data || error);
    res.status(500).json(error);
  }
};

/*
=========================================================
FUNCTION: updateTransactionStatus
WHEN IT RUNS:
→ After successful payment on Cashfree

WHAT IT DOES:
1. Updates order status from PENDING → SUCCESSFUL
2. Stores paymentId returned by Cashfree
3. Marks user as PREMIUM in database
=========================================================
*/
const updateTransactionStatus = async (req, res) => {
  try {
    // Get orderId and paymentId from frontend
    const { orderId, paymentId } = req.body;

    // Update order status in Orders table
    await Order.update(
      {
        paymentId: paymentId,
        status: "SUCCESSFUL",
      },
      { where: { orderId: orderId } },
    );

    // Mark the user as premium
    await User.update({ isPremium: true }, { where: { id: req.user.id } });

    res.status(200).json({ message: "Transaction Successful" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { buyPremium, updateTransactionStatus };
