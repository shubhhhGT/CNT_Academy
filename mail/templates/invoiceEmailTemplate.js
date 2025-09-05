const Course = require("../../models/Course");

exports.invoiceEmailTemplate = async (
  fullName,
  courseIds,
  userEmail,
  amountPaid,
  policyUrl,
  downloadUrl
) => {
  // Extract first name
  const firstName = fullName.split(" ")[0];
  const coursesFromDB = await Course.find({
    _id: { $in: courseIds },
  });

  const courseNames = coursesFromDB.map((course) => course.courseName);

  // Join courses with comma if multiple
  const courseList = Array.isArray(courseNames)
    ? courseNames.join(", ")
    : courseNames;

  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Welcome to CNT Academy</title>
      <style>
        body {
          background-color: #ffffff;
          font-family: Arial, sans-serif;
          color: #333333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: left;
        }
        .logo {
          max-width: 200px;
          margin-bottom: 20px;
        }
        .heading {
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .subheading {
          font-size: 18px;
          font-weight: bold;
          margin: 15px 0 5px 0;
        }
        .body {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .cta {
          display: inline-block;
          padding: 12px 24px;
          background-color: #FFD60A;
          color: #000000;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          margin-top: 15px;
        }
        .important {
          font-size: 14px;
          color: #d9534f;
          margin-top: 20px;
        }
        .footer {
          font-size: 14px;
          color: #999999;
          margin-top: 30px;
        }
        a {
          color: #000000;
        }
      </style>
    </head>
    <body>
      <div class="container">
      <div style="text-align: center;">
        <a href="https://cntacademy.com/">
          <img class="logo" src="https://chartntrade-backend-bucket-1.s3.ap-south-1.amazonaws.com/CNT_Academy/CNT-logo.png" alt="CNT Academy Logo"/>
        </a>
      </div>

        <div class="heading">Welcome to CNT Academy – Your Learning Journey Begins Now!</div>
        <div class="body">
          <p>Dear ${firstName},</p>
          <p>Congratulations on enrolling in <strong>${courseList}</strong> with CNT Academy! We’re excited to have you on board and are committed to providing you with a high-quality learning experience.</p>

          <div class="subheading">Course Details:</div>
          <ul>
            <li><strong>User ID:</strong> ${userEmail}</li>
            <li><strong>Course Name(s):</strong> ${courseList}</li>
            <li><strong>Total Amount:</strong> ${amountPaid}</li>
          </ul>

          <div class="subheading">What’s Next?</div>
          <ul>
            <li>Log in to your account and explore the course materials.</li>
            <li>Join our exclusive Telegram community for updates and discussions: <a href="https://t.me/cntacademy" target="_blank">https://t.me/cntacademy</a></li>
            <li>Read our Terms & Conditions, Refund Policy, and Privacy Policy here: <a href="${policyUrl}" target="_blank">${policyUrl}</a></li>
            <li>Connect with our support team for any queries: <br/>
                Email: <a href="mailto:info@cntacademy.com">info@cntacademy.com</a>
            </li>
          </ul>

          <div style="text-align: center; margin-top: 20px;">
  <a class="cta" href="${downloadUrl}" target="_blank">Download Invoice</a>
</div>

          <div class="important">⚠️ SEBI Disclaimer & Important Notes:</div>
          <ul>
            <li>This course is strictly for educational purposes only and does not constitute investment advice, research analysis, or stock recommendations under SEBI (Research Analysts) Regulations.</li>
            <li>CNT Academy (Agnostic Edufin Pvt Ltd) is not responsible for any financial decisions made based on the course content.</li>
            <li>No complaints related to financial transactions, advisory services, or investment performance shall be entertained under SEBI guidelines.</li>
          </ul>

          <p>We’re thrilled to be a part of your learning journey and look forward to your success!</p>
          <p>Best Regards,<br/>Team CNT Academy<br/>(A Brand of Agnostic Edufin Pvt Ltd)</p>

          <div class="footer">
            <a href="mailto:info@chartntrade.com">info@chartntrade.com</a> | <a href="https://www.cntacademy.com">www.cntacademy.com</a>
          </div>
        </div>
      </div>
    </body>
  </html>`;
};
