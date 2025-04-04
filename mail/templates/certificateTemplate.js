exports.certificateTemplate = ({ userName, courseName, issueDate }) => `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Certificate of Completion</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Pinyon+Script&display=swap");
      body {
        background-color: #f8f8f8;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        overflow: hidden;
      }
      .certificate {
        width: 1566px;
        height: 701px;
        background: white;
        border-radius: 10px;
        position: relative;
      }
      .gold-ribbon {
        position: absolute;
        top: -250px;
        width: 100%;
      }
      .blue-ribbon {
        position: absolute;
        top: -270px;
        width: 100%;
        z-index: 10;
      }
      .badge {
        position: absolute;
        width: 400px;
        height: 300px;
        z-index: 10;
      }
      .header {
        position: absolute;
        width: 500px;
        top: 100px;
        right: 30px;
        z-index: 11;
        color: white;
        padding: 20px;
        font-size: 50px;
        font-family: "Pinyon Script", cursive;
      }
      .image-container {
        width: 80%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 40px;
        padding: 20px;
        margin: 0 auto;
        z-index: 11;
      }
      .logo {
        width: 200px;
        margin-top: 150px;
        transform: translate(0%, -70%);
      }
      .content {
        margin: 20px;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      .recipient {
        font-size: 52px;
        font-weight: bold;
        margin: 10px 0;
        font-family: "Pinyon Script", cursive;
      }
      .signatures {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 60px;
      }
      .signature {
        text-align: center;
        border-top: 2px solid black;
        padding-top: 5px;
        width: 250px;
        font-size: 20px;
        position: relative;
      }
      .signature img {
        width: 200px;
        position: absolute;
        top: -80px;
        left: 50%;
        transform: translateX(-50%);
      }
      .signature p {
        position: absolute;
        width: 150px;
        top: -45px;
        left: 50%;
        transform: translateX(-50%);
        font-weight: bold;
      }
      .course-name {
        font-weight: bold;
        font-size: 22px;
        color: #1a237e;
      }
      .empty {
        height: 250px;
      }
    </style>
  </head>
  <body>
    <div class="certificate">
      <div class="header">Certificate Of Completion</div>
      <img
        src="./cnt_frontend/src/assets/Images/wave1.png"
        alt="Blue Ribbon"
        class="blue-ribbon"
      />
      <img
        src="./cnt_frontend/src/assets/Images/wave2.png"
        alt="Gold Ribbon"
        class="gold-ribbon"
      />
      <img
        src="./cnt_frontend/src/assets/Images/badge.png"
        alt="badge"
        class="badge"
      />
      <div class="empty"></div>
      <div class="image-container">
        <img
          src="./cnt_frontend/src/assets/Logo/CNT-logo.png"
          alt="Company Logo"
          class="logo"
        />

        <div>
          <div class="content">
            <p>THIS IS TO CERTIFY THAT</p>
            <div class="recipient">${userName}</div>
            <p>
              has successfully completed the
              <span class="course-name">${courseName}</span>. This
              certificate is awarded in recognition of the commitment,
              knowledge, and expertise demonstrated during the course. The
              recipient has acquired a strong understanding of fundamental and
              technical analysis, risk management, and trading strategies
              essential for navigating the stock market with confidence.
            </p>
          </div>
          <div class="signatures">
            <div class="signature">
              <img
                src="./cnt_frontend/src/assets/Images/signature.png"
                alt="Instructor Signature"
              />
              <strong>Vikash Bagaria</strong><br />
              Instructor
            </div>
            <div class="signature">
              <p>${issueDate}</p>
              <strong>Date</strong><br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;
