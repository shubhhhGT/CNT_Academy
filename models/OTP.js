// import mongoose for creating a schema
const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

// Create and export the schema
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "10m",
  },
});

// A function to send emails
async function sendVerificationEmail(email, otp) {
  try {
    await mailSender(
      email,
      "Verification Email from CNT Academy",
      emailTemplate(otp)
    );
    console.log("Email sent Suceessfully", otp);
  } catch (error) {
    console.log("error occured while sending email", error);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
