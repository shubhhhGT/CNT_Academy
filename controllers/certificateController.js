const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Certificate = require("../models/Certificate");
const puppeteer = require("puppeteer");
const { sendEmailWithAttachment } = require("../utils/mailSender");
const {
  certificateTemplate,
} = require("../mail/templates/certificateTemplate");

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
      populate: { path: "courseContent", populate: { path: "subSections" } },
    });
    const totalVideos = progress.courseID.courseContent.flatMap(
      (section) => section.subSections
    ).length;
    const completedVideos = progress.completedVideos.length;
    if (completedVideos < totalVideos) {
      return res
        .status(400)
        .json({ success: false, message: "Course not yet completed" });
    }

    // Generate certificate HTML with dynamic values
    const html = certificateTemplate({
      userName: `${user.firstName} ${user.lastName}`,
      courseName: course.courseName,
      issueDate: new Date().toLocaleDateString(),
    });

    // Generate PDF using puppeteer, preserving your certificate dimensions
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    // Option 1: Using custom dimensions matching your HTML (if needed)
    // const pdfBuffer = await page.pdf({ width: "1566px", height: "701px", landscape: true, printBackground: true });
    // Option 2: Using A4 landscape (standard, usually works well)
    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
    });
    await browser.close();

    // Check certificate record. If it doesn't exist, create one.
    let certificateRecord = await Certificate.findOne({
      user: userId,
      course: courseId,
    });
    if (!certificateRecord) {
      certificateRecord = await Certificate.create({
        user: userId,
        course: courseId,
        // fileName field can be omitted if not needed
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
