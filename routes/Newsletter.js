const express = require("express");
const router = express.Router();
const {
  subscribeToNewsletter,
  getAllSubscribers,
} = require("../controllers/Newsletter");
const { auth, isAdmin } = require("../middlewares/auth");

// Public route to subscribe
router.post("/subscribe", subscribeToNewsletter);

// Admin-only route to get all
router.get("/subscribers", auth, isAdmin, getAllSubscribers);

module.exports = router;
