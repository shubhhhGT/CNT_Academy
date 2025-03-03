const express = require("express");
const {
  addToCart,
  removeFromCart,
  getEntireCart,
  resetCart,
} = require("../controllers/Cart");
const router = express.Router();

// Middlewares
const { auth, isUser } = require("../middlewares/auth");

router.post("/addToCart", auth, isUser, addToCart);
router.post("/removefromCart", auth, isUser, removeFromCart);
router.get("/getEntireCart", auth, isUser, getEntireCart);
router.post("/resetCart", auth, isUser, resetCart);

module.exports = router;
