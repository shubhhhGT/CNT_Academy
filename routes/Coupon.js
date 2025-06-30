const express = require("express");
const router = express.Router();
const {
  createCoupon,
  getAllCoupons,
  toggleCouponBanner,
  deleteCoupon,
  toggleCouponActive,
  getBannerCoupons,
  validateCoupon,
} = require("../controllers/Coupon");
const { auth, isAdmin } = require("../middlewares/auth");

router.post("/create", auth, isAdmin, createCoupon);
router.get("/all", auth, isAdmin, getAllCoupons);
router.patch("/toggle-banner", auth, isAdmin, toggleCouponBanner);
router.delete("/delete", auth, isAdmin, deleteCoupon);
router.patch("/toggle-active", auth, isAdmin, toggleCouponActive);
router.get("/banner", getBannerCoupons);
router.post("/validate", validateCoupon);

module.exports = router;
