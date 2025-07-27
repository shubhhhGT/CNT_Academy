const generatePdf = require("../utils/generatePdf");
const Certificate = require("../models/Certificate");
const { uploadFileToS3 } = require("../utils/uploadInvoiceToS3");
const {
  certificateEmailTemplate,
} = require("../mail/templates/certificateEmailTemplate");
const { mailSender } = require("../utils/mailSender");
const {
  certificateTemplate,
} = require("../mail/templates/certificateTemplate");

// Helper to format date like "12th July, 2025"
function formatDateWithSuffix(date = new Date()) {
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${day}${suffix} ${month}, ${year}`;
}

exports.createAndEmailCertificate = async (req, res) => {
  try {
    const user = req.user;
    const { courseId, courseName } = req.body;

    if (!courseId || !courseName) {
      return res.status(400).json({ message: "Missing course details" });
    }

    const formattedDate = formatDateWithSuffix();
    const html = certificateTemplate({
      userName: user.name,
      courseName,
      issueDate: formattedDate,
    });

    const pdfBuffer = await generatePdf(html);

    const certKey = `certificate/certificate-${Date.now()}.pdf`;
    const s3Url = await uploadFileToS3(pdfBuffer, certKey, "application/pdf");

    await Certificate.create({
      user: user.id,
      course: courseId,
      url: s3Url,
    });

    await mailSender(
      user.email,
      "Your CNT Academy Course Completion Certificate",
      certificateEmailTemplate(user.name, s3Url)
    );

    res.status(200).json({
      success: true,
      message: "Certificate generated and emailed successfully",
      downloadUrl: s3Url,
    });
  } catch (error) {
    console.error("Certificate generation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate certificate",
    });
  }
};

exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({})
      .populate("course", "courseName")
      .sort({ createdAt: -1 }); // Most recent first

    return res.status(200).json({
      success: true,
      message: "All certificates fetched successfully",
      data: certificates,
    });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch certificates",
    });
  }
};
