const {
  contactUsEmail,
  adminContactNotification,
} = require("../mail/templates/contactFormRes");
const { mailSender } = require("../utils/mailSender");

exports.contactUsController = async (req, res) => {
  try {
    const { email, firstName, lastName, message, phoneNo, countrycode } =
      req.body;

    // Send mail
    const emailResponse = await mailSender(
      email,
      "Your Request Sent Successfully",
      contactUsEmail(email, firstName, lastName, message, phoneNo, countrycode)
    );
    console.log("Email response:", emailResponse);

    // Send notification email to admin/support
    const adminEmailResponse = await mailSender(
      process.env.ADMIN_EMAIL, // Your admin email address
      "New Contact Form Submission",
      adminContactNotification(
        email,
        firstName,
        lastName,
        message,
        phoneNo,
        countrycode
      )
    );
    console.log("Admin Email response:", adminEmailResponse);

    // Return res
    return res.status(200).json({
      success: true,
      message: "Request for contacting us sent successfully",
      emailResponse,
    });
  } catch (error) {
    console.error(error);
    console.log("error", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
