const express = require("express");
const router = express.Router();
const { downloadUserReport } = require("../controllers/UserReport");
const { auth, isAdmin } = require("../middlewares/auth");

// For downloading user report
router.get("/download-user-report", auth, isAdmin, downloadUserReport);

module.exports = router;
