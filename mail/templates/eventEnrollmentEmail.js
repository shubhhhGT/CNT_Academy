exports.eventEnrollmentEmail = (eventName, name, meetingLink) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Event Registration Confirmation</title>
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
          text-align: center;
        }
        .logo {
          max-width: 200px;
          margin-bottom: 20px;
        }
        .message {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .body {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .cta {
          display: inline-block;
          padding: 10px 20px;
          background-color: #FFD60A;
          color: #000000;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          margin-top: 20px;
        }
        .support {
          font-size: 14px;
          color: #999999;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="https://cntacademy.com/">
          <img class="logo" src="https://chartntrade-backend-bucket-1.s3.ap-south-1.amazonaws.com/CNT_Academy/CNT-logo.png" alt="CNT Academy Logo"/>
        </a>
        <div class="message">Event Registration Confirmation</div>
        <div class="body">
          <p>Dear ${name},</p>
          <p>Thank you for registering for <strong>${eventName}</strong>! 🎉</p>
          <p>Below is your meeting link to join the event:</p>
          <a class="cta" href="${meetingLink}" target="_blank">Join Event</a>
        </div>
        <div class="support">
          If you have any questions, contact us at 
          <a href="mailto:admin@cntacademy.com">admin@cntacademy.com</a>.
        </div>
      </div>
    </body>
  </html>`;
};
