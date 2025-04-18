// Import nodemailer to send email
const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    // Create Transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.MAIL_HOST,
      port: 587, // Use port 465 for SSL
      secure: false, // Use SSL
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailDetails = {
      from: `"CNT Academy" <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    };

    // Send mail
    let info = transporter.sendMail(mailDetails, (error, info) => {
      if (error) {
        console.log("Error sending email: ", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};

const sendEmailWithAttachment = async (
  email,
  subject,
  body,
  pdfBuffer,
  fileName
) => {
  try {
    // Create transporter
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send mail with attachment
    let info = await transporter.sendMail({
      from: `"CNT Academy" <${process.env.MAIL_USER}>`,
      to: email,
      subject: subject,
      html: body,
      attachments: [
        {
          filename: fileName,
          content: pdfBuffer,
          encoding: "base64",
        },
      ],
    });

    console.log("Email sent: ", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { mailSender, sendEmailWithAttachment };
