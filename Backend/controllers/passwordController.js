const sib = require("sib-api-v3-sdk");

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const client = sib.ApiClient.instance;

    const apiKey = client.authentications["api-key"];

    apiKey.apiKey = process.env.BREVO_API_KEY;

    const tranEmailApi = new sib.TransactionalEmailsApi();

    await tranEmailApi.sendTransacEmail({
      sender: {
        email: "yourgmail@gmail.com",
        name: "Expense Tracker",
      },

      to: [
        {
          email: email,
        },
      ],

      subject: "Reset your password",

      textContent: "This is a test reset password email",
    });

    return res.status(200).json({
      message: "Reset email sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to send email",
    });
  }
};
