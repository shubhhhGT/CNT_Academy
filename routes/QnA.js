const express = require("express");
const router = express.Router();
const Question = require("../models/Questions");
const { auth, isAdmin } = require("../middlewares/auth");

// POST new question (public)
router.post("/ask", async (req, res) => {
  const { title, description } = req.body;
  const question = new Question({ title, description });
  await question.save();
  res.status(201).json({ success: true, message: "Question posted", question });
});

// GET all questions (with filter)
router.get("/getAllQuestions", async (req, res) => {
  const questions = await Question.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, questions });
});

// POST an answer (admin only)
router.post("/answer", auth, isAdmin, async (req, res) => {
  const { questionId, content } = req.body;
  const question = await Question.findById(questionId);
  if (!question) return res.status(404).json({ error: "Question not found" });

  question.answers.push({ content, answeredBy: req.user.username });
  question.isAnswered = true;
  await question.save();

  res.json({ success: true, message: "Answer added", question });
});

module.exports = router;
