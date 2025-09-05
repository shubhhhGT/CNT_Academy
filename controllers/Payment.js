const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const Coupon = require("../models/Coupon");
const User = require("../models/User");
const { mailSender } = require("../utils/mailSender");
const crypto = require("crypto");
const mongoose = require("mongoose");
const OrderHistory = require("../models/OrderHistory");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const {
  paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");

// Capture the payment and initiate the razorpay order

// Capture and verify payment for invoice + discounts
const PaymentSession = require("../models/PaymentSession");
const { generateAndUploadInvoice } = require("../utils/completeInvoiceBilling");
const {
  invoiceEmailTemplate,
} = require("../mail/templates/invoiceEmailTemplate");

exports.capturePayment = async (req, res) => {
  const { courses, couponCode, billingInfo } = req.body;
  const userId = req.user.id;

  if (!courses || courses.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide courses" });
  }

  let totalAmount = 0;

  for (const course_id of courses) {
    const course = await Course.findById(course_id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: `Course not found: ${course_id}` });
    }

    if (course.studentsEntrolled.includes(userId)) {
      return res.status(403).json({
        success: false,
        message: `Already enrolled in: ${course.courseName}`,
      });
    }

    totalAmount += course.price;
  }

  if (couponCode) {
    const coupon = await Coupon.findOne({ name: couponCode.toUpperCase() });
    if (
      !coupon ||
      !coupon.isActive ||
      new Date(coupon.expiresAt) < new Date()
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired coupon" });
    }
    const discountAmount = (totalAmount * coupon.discountPercentage) / 100;
    totalAmount -= discountAmount;
  }

  // Create Razorpay order
  const options = {
    amount: Math.round(totalAmount * 100),
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const paymentResponse = await instance.orders.create(options);

    // Save payment session
    await PaymentSession.create({
      userId,
      orderId: paymentResponse.id,
      billingInfo,
      courseIds: courses,
      amountPaid: totalAmount,
    });

    return res.status(200).json({
      success: true,
      message: paymentResponse,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate Razorpay order",
    });
  }
};

exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    courses,
  } = req.body;

  const userId = req.user.id;
  const email = req.user.email;
  const name = req.user.name;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(404).json({ success: false, message: "Payment Failed" });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res
      .status(500)
      .json({ success: false, message: "Payment Verification Failed" });
  }

  // Enroll students
  await enrollStudents(courses, userId, res);

  try {
    const session = await PaymentSession.findOne({
      orderId: razorpay_order_id,
    });

    if (!session) {
      console.warn("No billing session found for invoice generation.");
    } else {
      const url = await generateAndUploadInvoice({
        billingInfo: session.billingInfo,
        courseIds: session.courseIds,
        orderId: session.orderId,
        amountPaid: session.amountPaid,
      });

      if (url) {
        const emailHtml = await invoiceEmailTemplate(
          name,
          session.courseIds,
          email,
          session.amountPaid,
          `https://www.cntacademy.com/privacy-policy`,
          url
        );

        await mailSender(
          email,
          "Welcome to CNT Academy – Your Learning Journey Begins Now!",
          emailHtml
        );
      }

      // Optionally delete session
      await PaymentSession.deleteOne({ _id: session._id });
    }
  } catch (err) {
    console.error("Invoice generation failed:", err);
    // Don't block the user — let them proceed even if invoice failed
  }

  return res.status(200).json({
    success: true,
    message: "Payment Verified",
  });
};

const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please provide courseId and UserId",
    });
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEntrolled: userId } },
        { new: true }
      ).populate("instructor");

      if (!enrolledCourse) {
        return res.status(404).json({
          success: false,
          message: "Could not find enrolled course",
        });
      }

      // create course Progress for a student
      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      });

      // Create order history entry
      const orderHistoryEntry = await OrderHistory.create({
        courseName: enrolledCourse.courseName,
        instructorName: `${enrolledCourse.instructor.firstName} ${enrolledCourse.instructor.lastName}`,
        price: enrolledCourse.price,
      });

      // Update the user with the enrolled course
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
            orderHistory: orderHistoryEntry._id,
          },
        },
        { new: true }
      );

      // Send Mail for successful enrollment
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName}`
        )
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Could not enroll student in the course",
      });
    }
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" });
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("error in sending mail", error);
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" });
  }
};
