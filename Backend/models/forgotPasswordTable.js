const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ForgotPassword", forgotPasswordSchema);
