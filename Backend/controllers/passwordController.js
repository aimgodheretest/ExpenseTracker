const User = require("../models/usersTable");
const bcrypt = require("bcrypt");
const ForgotPasswordRequests = require("../models/forgotPasswordTable");

const sib = require("sib-api-v3-sdk");
const uuid = require("uuid");

const forgotPassword = async (req, res) => {
  try {
    console.log("Forgot password API called");
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const request = await ForgotPasswordRequests.create({
      id: uuid.v4(),
      isActive: true,
      UserId: user.id,
    });

    const resetLink = `http://localhost:3000/password/resetpassword/${request.id}`;

    console.log("Generated Reset Link:", resetLink);
    console.log("Sending reset email to:", email);

    /* Brevo configuration */
    const client = sib.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const tranEmailApi = new sib.TransactionalEmailsApi();

    /* Send Email */

    const data = await tranEmailApi.sendTransacEmail({
      sender: {
        email: "murlik784@gmail.com",
        name: "Expense Tracker",
      },

      to: [{ email }],

      subject: "Reset your password",

      htmlContent: `<a href="${resetLink}">Click here to reset password</a>`,
    });

    console.log("Brevo response:", data);

    res.status(200).json({
      message: "Reset link sent to email",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getResetPassword = async (req, res) => {
  const id = req.params.id;

  const request = await ForgotPasswordRequests.findOne({
    where: { id },
  });

  if (request && request.isActive) {
    res.send(`
<html>
<body>

<form action="/password/updatepassword/${id}" method="POST">

<label>Enter New Password</label>
<input type="password" name="newpassword" required/>

<button type="submit">Reset Password</button>

</form>

</body>
</html>
`);
  }
};

const updatePassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { newpassword } = req.body;

    const request = await ForgotPasswordRequests.findOne({
      where: { id },
    });

    if (!request) {
      return res.status(404).json({ message: "Invalid request" });
    }

    const user = await User.findOne({
      where: { id: request.UserId },
    });

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    await user.update({
      password: hashedPassword,
    });

    await request.update({
      isActive: false,
    });

    res.send("Password updated successfully");
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update password",
    });
  }
};
module.exports = { forgotPassword, getResetPassword, updatePassword };
