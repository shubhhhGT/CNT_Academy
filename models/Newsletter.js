const mongoose = require("mongoose");

const newsletterSubscriberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    signupDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "NewsletterSubscriber",
  newsletterSubscriberSchema
);
