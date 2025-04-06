exports.contactUsEmail = (
  email,
  firstname,
  lastname,
  message,
  phoneNo,
  countrycode
) => {
  return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>Contact Form Confirmation</title>
          <style>
              body {
                  background-color: #ffffff;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.4;
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
                  font-size: 16px;
                  font-weight: bold;
                  margin-top: 20px;
              }
      
              .support {
                  font-size: 14px;
                  color: #999999;
                  margin-top: 20px;
              }
      
              .highlight {
                  font-weight: bold;
              }
          </style>
      
      </head>
      
      <body>
          <div class="container">
              <a href="https://cntacademy.com/"><img class="logo"
                      src="../../assets/images/CNT-logo.png" alt="CntAcademy Logo"></a>
              <div class="message">Contact Form Confirmation</div>
              <div class="body">
                  <p>Dear ${firstname} ${lastname},</p>
                  <p>Thank you for contacting us. We have received your message and will respond to you as soon as possible.
                  </p>
                  <p>Here are the details you provided:</p>
                  <p>Name: ${firstname} ${lastname}</p>
                  <p>Email: ${email}</p>
                  <p>Phone Number: ${countrycode.split(" ")[0]} ${phoneNo}</p>
                  <p>Message: ${message}</p>
                  <p>We appreciate your interest and will get back to you shortly. </p>
              </div>
              <div class="support">If you have any further questions or need immediate assistance, please feel free to reach
                  out to us at <a href="mailto:admin@cntacademy.com">admin@cntacademy.com</a>. We are here to help!</div>
          </div>
      </body>
      
      </html>`;
};

// In ../mail/templates/adminContactNotification.js
exports.adminContactNotification = (
  email,
  firstname,
  lastname,
  message,
  phoneNo,
  countrycode
) => {
  return `<!DOCTYPE html>
        <html>
        
        <head>
            <meta charset="UTF-8">
            <title>New Contact Form Submission</title>
            <style>
                body {
                    background-color: #ffffff;
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.4;
                    color: #333333;
                    margin: 0;
                    padding: 0;
                }
        
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
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
        
                .highlight {
                    font-weight: bold;
                }
        
                .footer {
                    font-size: 14px;
                    color: #999999;
                    margin-top: 20px;
                }
            </style>
        
        </head>
        
        <body>
            <div class="container">
                <a href="https://cntacademy.com/"><img class="logo"
                        src="https://i.postimg.cc/sX4Z3z1Y/CNT-logo.png" alt="CntAcademy Logo"></a>
                <div class="message">New Contact Form Submission</div>
                <div class="body">
                    <p><span class="highlight">New contact form submission received:</span></p>
                    <p><strong>Name:</strong> ${firstname} ${lastname}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone Number:</strong> ${
                      countrycode.split(" ")[0]
                    } ${phoneNo}</p>
                    <p><strong>Message:</strong> ${message}</p>
                </div>
                <div class="footer">Please follow up with the user accordingly. If you need any additional information, feel free to reach out.</div>
            </div>
        </body>
        
        </html>`;
};
