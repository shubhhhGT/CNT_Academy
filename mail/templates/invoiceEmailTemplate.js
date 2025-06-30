exports.invoiceEmailTemplate = (name, downloadUrl) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Your CNT Academy Invoice</title>
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
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .body {
          font-size: 16px;
          margin-bottom: 20px;
          line-height: 1.6;
        }
        .cta {
          display: inline-block;
          padding: 12px 24px;
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
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="https://cntacademy.com/">
          <img class="logo" src="https://chartntrade-backend-bucket-1.s3.ap-south-1.amazonaws.com/CNT_Academy/CNT-logo.png" alt="CNT Academy Logo"/>
        </a>
        <div class="message">Thank You for Your Purchase!</div>
        <div class="body">
          <p>Dear ${name},</p>
          <p>We appreciate your recent purchase with <strong>CNT Academy</strong>.</p>
          <p>Your invoice has been successfully generated and is ready for download.</p>
          <p>Click the button below to download your invoice:</p>
          <a class="cta" href="${downloadUrl}" target="_blank">Download Invoice</a>
        </div>
        <div class="support">
          If you have any questions or need assistance, feel free to contact us at 
          <a href="mailto:admin@cntacademy.com">admin@cntacademy.com</a>.
        </div>
      </div>
    </body>
  </html>`;
};
