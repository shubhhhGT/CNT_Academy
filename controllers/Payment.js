const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
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
exports.capturePayment = async (req, res) => {
  // get all the courses from req body
  const { courses } = req.body;
  const userId = req.user.id;

  if (courses.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Please provide courses",
    });
  }

  // get the total amount
  let totalAmount = 0;

  for (const course_id of courses) {
    let course;

    try {
      course = await Course.findById(course_id);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Could not find course",
        });
      }

      // Checjk if user has not already purchased the course
      const uid = new mongoose.Types.ObjectId(userId);

      if (course.studentsEntrolled.includes(uid)) {
        res.status(403).json({
          success: false,
          message: "Student already enrolled in course",
        });
      }

      totalAmount += course.price;
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Create options
  // Options are extra data that is required for payment
  const options = {
    amount: totalAmount * 100, //Doing this bcoz razorpay takes the amount of INR as paise
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    console.log("payment response ", paymentResponse);
    res.json({
      success: true,
      message: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not Initiate Order",
    });
  }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
  // get razorpay order id
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;

  const courses = req.body?.courses;
  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(404).json({
      success: false,
      message: "Payment Failed",
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // Enroll student
    await enrollStudents(courses, userId, res);

    // Return res
    return res.status(200).json({
      success: true,
      message: "Payment Verified",
    });
  }
  return res.status(500).json({
    success: false,
    message: "Payment Failed",
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
      console.log("enrolled student", enrolledStudent);

      // Send Mail for successful enrollment
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName}`
        )
      );
      console.log("Email sent Successfully", emailResponse);
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
