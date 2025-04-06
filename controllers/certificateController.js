const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Certificate = require("../models/Certificate");
const { sendEmailWithAttachment } = require("../utils/mailSender");
const {
  certificateTemplate,
} = require("../mail/templates/certificateTemplate");
const pdf = require("html-pdf-node");

exports.generateAndEmailCertificate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    // Get user & course
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);
    if (!course || !user) {
      return res
        .status(404)
        .json({ success: false, message: "User or Course not found" });
    }

    // Check if course is completed
    const progress = await CourseProgress.findOne({
      userId,
      courseID: courseId,
    }).populate({
      path: "courseID",
      populate: { path: "courseContent", populate: { path: "subSection" } },
    });

    const totalVideos = progress.courseID.courseContent.flatMap(
      (section) => section.subSection
    ).length;
    const completedVideos = progress.completedVideos.length;
    if (completedVideos < totalVideos) {
      return res
        .status(400)
        .json({ success: false, message: "Course not yet completed" });
    }

    // Paths to your images (adjust according to your directory structure)
    const imagePaths = {
      wave1: path.resolve(__dirname, "../assets/images/wave1.png"),
      wave2: path.resolve(__dirname, "../assets/images/wave2.png"),
      badge: path.resolve(__dirname, "../assets/images/badge.png"),
      logo: path.resolve(__dirname, "../assets/images/CNT-logo.png"),
      signature: path.resolve(__dirname, "../assets/images/signature.png"),
    };

    // Read images and convert to Base64
    const readImageAsBase64 = (filePath) => {
      try {
        return fs.readFileSync(filePath, { encoding: "base64" });
      } catch (error) {
        console.error("Error reading image:", filePath, error);
        return ""; // Return empty string or handle error appropriately
      }
    };

    const imageData = {
      wave1Base64: readImageAsBase64(imagePaths.wave1),
      wave2Base64: readImageAsBase64(imagePaths.wave2),
      badgeBase64: readImageAsBase64(imagePaths.badge),
      logoBase64: readImageAsBase64(imagePaths.logo),
      signatureBase64: readImageAsBase64(imagePaths.signature),
    };

    // Generate certificate HTML with dynamic values
    const html = certificateTemplate({
      userName: `${user.firstName} ${user.lastName}`,
      courseName: course.courseName,
      issueDate: new Date().toLocaleDateString(),
      ...imageData,
    });

    // Create PDF buffer using html-pdf-node
    const file = { content: html };
    const pdfOptions = {
      format: "A4",
      landscape: true,
      preferCSSPageSize: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--font-render-hinting=none",
      ],
    };
    const pdfBuffer = await new Promise((resolve, reject) => {
      pdf.generatePdf(file, pdfOptions, (err, buffer) => {
        if (err) return reject(err);
        resolve(buffer);
      });
    });

    // Check certificate record. If it doesn't exist, create one.
    let certificateRecord = await Certificate.findOne({
      user: userId,
      course: courseId,
    });
    if (!certificateRecord) {
      certificateRecord = await Certificate.create({
        user: userId,
        course: courseId,
      });
    }

    // Email the certificate PDF attachment
    await sendEmailWithAttachment(
      user.email,
      `🎓 Certificate from CNT Academy for ${course.courseName}`,
      `<p>Hi ${user.firstName},</p><p>Congratulations on completing <b>${course.courseName}</b>! 🎉<br>Your certificate is attached to this email.</p>`,
      pdfBuffer,
      `Certificate-${user.firstName}-${course.courseName}.pdf`
    );

    return res
      .status(200)
      .json({ success: true, message: "Certificate emailed successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to generate certificate" });
  }
};
