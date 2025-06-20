const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middlewares/auth");
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/Event");

router.post("/create", auth, isAdmin, createEvent);
router.get("/all", getAllEvents);
router.get("/:id", getEventById);
router.put("/update", auth, isAdmin, updateEvent);
router.delete("/delete", auth, isAdmin, deleteEvent);

module.exports = router;
