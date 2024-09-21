const express = require("express");
const router = express.Router();
const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/Payment");
const { auth, isUser } = require("../middlewares/auth");

router.post("/capturePayment", auth, isUser, capturePayment);
router.post("/verifyPayment", auth, isUser, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isUser, sendPaymentSuccessEmail);

module.exports = router;
