const mongoose = require("mongoose");

const invoiceCounterSchema = new mongoose.Schema({
  yearMonth: { type: String, required: true, unique: true },
  sequence: { type: Number, default: 0 },
});

module.exports = mongoose.model("InvoiceCounter", invoiceCounterSchema);
