const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
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
    default: Date.now(),
     expires: 600,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "varificatin email from studynotion",
      otp
    );
    console.log("Email sent Successfully:", mailResponse);
  } catch (error) {
    console.log("error sending while sending mails :", error);
    throw error;
  }
}

OTPSchema.pre("save", async function(next) {
   await sendVerificationEmail(this.email,this.otp)
  
})

module.exports = mongoose.model("OTP", OTPSchema);
