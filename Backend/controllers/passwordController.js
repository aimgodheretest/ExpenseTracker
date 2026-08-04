const User = require("../models/usersTable");
const ForgotPassword = require("../models/forgotPasswordTable");
const bcrypt = require("bcrypt");
const sib = require("sib-api-v3-sdk");

// ===============================
// Forgot Password
// ===============================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Create Reset Request
    const request = await ForgotPassword.create({
      isActive: true,
      user: user._id,
    });

    const resetLink = `http://localhost:3000/password/resetpassword/${request._id}`;

    // Brevo Configuration
    const client = sib.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const tranEmailApi = new sib.TransactionalEmailsApi();

    await tranEmailApi.sendTransacEmail({
      sender: {
        email: "murlik784@gmail.com",
        name: "Expense Tracker",
      },

      to: [{ email }],

      subject: "Reset your password",

      htmlContent: `<a href="${resetLink}">Click here to reset password</a>`,
    });

    res.status(200).json({
      message: "Reset link sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// ===============================
// Show Reset Password Page
// ===============================
const getResetPassword = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await ForgotPassword.findById(id);

    if (!request || !request.isActive) {
      return res.status(400).send("Invalid or expired reset link");
    }

    res.send(`
      <html>
        <body>
          <form action="/password/updatepassword/${id}" method="POST">
            <label>Enter New Password</label>
            <input type="password" name="newpassword" required />
            <button type="submit">Reset Password</button>
          </form>
        </body>
      </html>
    `);
  } catch (error) {
    console.log(error);

    res.status(500).send("Something went wrong");
  }
};

// ===============================
// Update Password
// ===============================
const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newpassword } = req.body;

    const request = await ForgotPassword.findById(id);

    if (!request || !request.isActive) {
      return res.status(404).json({
        message: "Invalid request",
      });
    }

    const user = await User.findById(request.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    user.password = hashedPassword;
    await user.save();

    request.isActive = false;
    await request.save();

    res.send("Password updated successfully");
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update password",
    });
  }
};

module.exports = {
  forgotPassword,
  getResetPassword,
  updatePassword,
};
