const express = require("express");
const router = express.Router();
const { auth, isUser } = require("../middlewares/auth");
const {
  createTestimonial,
  getAllTestimonials,
} = require("../controllers/Testimonial");

router.post("/createTestimonial", auth, isUser, createTestimonial);
router.get("/getAllTestimonials", getAllTestimonials);

module.exports = router;
