// models/PaymentSession.js
const mongoose = require("mongoose");

const PaymentSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  orderId: { type: String, required: true },
  billingInfo: { type: Object, required: true },
  courseIds: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
  amountPaid: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 }, // auto-delete after 1hr
});

module.exports = mongoose.model("PaymentSession", PaymentSessionSchema);
