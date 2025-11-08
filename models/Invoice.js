const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true },
    invoiceDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    placeOfSupply: { type: String, required: true },
    customerName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, required: true },
    addressLine3: { type: String, required: true },
    courseName: { type: [String], required: true },
    courseId: { type: [String], required: true },
    quantity: { type: Number, required: true },
    rate: { type: Number, required: true },
    gstPercent: { type: Number, default: 18 },
    gstAmount: { type: Number, required: true },
    amountInWords: { type: String, required: true },
    orderId: { type: String, required: true },
    pdfUrl: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
