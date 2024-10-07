// Import nodemailer to send email
const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    // Create Transporter
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465, // Use port 465 for SSL
      secure: true, // Use SSL
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send mail
    let info = await transporter.sendMail({
      from: `"CNT Academy" <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log(info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = mailSender;
