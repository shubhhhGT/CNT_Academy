// import mongoose for creating a schema
const mongoose = require("mongoose");

// Create and export the schema
const answerSchema = new mongoose.Schema({
  content: String,
  answeredBy: String,
  createdAt: { type: Date, default: Date.now },
});

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isAnswered: { type: Boolean, default: false },
  answers: [answerSchema],
});

module.exports = mongoose.model("Question", questionSchema);
