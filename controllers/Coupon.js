const Coupon = require("../models/Coupon");

// Create Coupon
exports.createCoupon = async (req, res) => {
  try {
    const { name, discountPercentage, expiresAt } = req.body;

    if (!name || !discountPercentage || !expiresAt) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existing = await Coupon.findOne({ name });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Coupon already exists" });
    }

    const coupon = await Coupon.create({
      name,
      discountPercentage,
      expiresAt,
    });

    res
      .status(201)
      .json({ success: true, message: "Coupon created", data: coupon });
  } catch (err) {
    console.error("Error creating coupon:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get All Coupons
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: coupons });
  } catch (err) {
    console.error("Error fetching coupons:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.toggleCouponBanner = async (req, res) => {
  try {
    const { couponId, showOnBanner } = req.body;

    const updated = await Coupon.findByIdAndUpdate(
      couponId,
      { showOnBanner },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Banner status updated", data: updated });
  } catch (err) {
    console.error("Error toggling banner display:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const { couponId } = req.body;
    await Coupon.findByIdAndDelete(couponId);
    res.status(200).json({ success: true, message: "Coupon deleted" });
  } catch (err) {
    console.error("Error deleting coupon:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.toggleCouponActive = async (req, res) => {
  try {
    const { couponId, isActive } = req.body;
    const updated = await Coupon.findByIdAndUpdate(
      couponId,
      { isActive },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ success: false, message: "Not found" });
    res
      .status(200)
      .json({ success: true, message: "Status updated", data: updated });
  } catch (err) {
    console.error("Error toggling active status:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Coupons Marked for Banner Display
exports.getBannerCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({
      showOnBanner: true,
      isActive: true, // Optional: only show active ones
      expiresAt: { $gt: new Date() }, // Optional: not expired
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: coupons });
  } catch (err) {
    console.error("Error fetching banner coupons:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.validateCoupon = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Coupon name required" });

    const coupon = await Coupon.findOne({ name: name.toUpperCase() });
    if (!coupon)
      return res
        .status(404)
        .json({ success: false, message: "Invalid coupon" });

    res.status(200).json({ success: true, data: coupon });
  } catch (err) {
    console.error("Validate coupon error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
