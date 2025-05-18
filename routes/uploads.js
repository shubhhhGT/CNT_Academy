const express = require("express");
const router = express.Router();
const {
  initiateVideoUpload,
  generateUploadUrls,
  completeVideoUpload,
} = require("../utils/uploadToS3");
const { auth } = require("../middlewares/auth");

// Routes for login, signup and authentication
// Route for intitiating upload
router.post("/initiate-upload", auth, initiateVideoUpload);

// Route for generating signed urls for upload
router.post("/generate-urls", auth, generateUploadUrls);

// Router for completing the video upload
router.post("/complete-upload", auth, completeVideoUpload);

module.exports = router;
