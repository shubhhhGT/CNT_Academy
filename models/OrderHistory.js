// import mongoose for creating a schema
const mongoose = require("mongoose");

// Create and export the OrderHistory schema
const orderHistorySchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    instructorName: {
      type: String,
      required: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderHistory", orderHistorySchema);
