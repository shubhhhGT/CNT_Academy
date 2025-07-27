exports.certificateTemplate = ({ userName, courseName, issueDate }) => `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Certificate of Completion</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: "Playfair Display", "Georgia", serif;
        background: linear-gradient(135deg, #f5f7fa 0%, #e6e9f0 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
      }

      .certificate-container {
        position: relative;
        width: 210mm; /* A4 width */
        height: 297mm; /* A4 height */
        background: linear-gradient(
            rgba(255, 255, 255, 0.95),
            rgba(255, 255, 255, 0.95)
          ),
          url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path fill="%23d4af37" fill-opacity="0.05" d="M50,0 Q70,20 100,50 Q80,70 50,100 Q30,80 0,50 Q20,30 50,0 Z"/></svg>');
        background-size: cover;
        color: #333;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        padding: 20mm;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 15px solid transparent;
        border-image: linear-gradient(45deg, #d4af37, #b08d57, #d4af37);
        border-image-slice: 1;
      }

      .corner-decoration {
        position: absolute;
        width: 100px;
        height: 100px;
      }

      .corner-tl {
        top: 30px;
        left: 30px;
        border-top: 3px solid #d4af37;
        border-left: 3px solid #d4af37;
      }

      .corner-tr {
        top: 30px;
        right: 30px;
        border-top: 3px solid #d4af37;
        border-right: 3px solid #d4af37;
      }

      .corner-bl {
        bottom: 30px;
        left: 30px;
        border-bottom: 3px solid #d4af37;
        border-left: 3px solid #d4af37;
      }

      .corner-br {
        bottom: 30px;
        right: 30px;
        border-bottom: 3px solid #d4af37;
        border-right: 3px solid #d4af37;
      }

      .content {
        position: relative;
        z-index: 2;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 20px 0;
      }

      .logo-container {
        position: absolute;
        top: 40px;
        width: 180px;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .logo {
        width: 100%;
        height: auto;
        max-height: 100px;
        object-fit: contain;
      }

      h1 {
        font-size: 48px;
        letter-spacing: 8px;
        text-transform: uppercase;
        margin: 60px 0 40px;
        color: #1a1a1a;
        position: relative;
        padding-bottom: 20px;
        font-weight: 600;
      }

      h1:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 150px;
        height: 3px;
        background: linear-gradient(
          to right,
          transparent,
          #d4af37,
          transparent
        );
      }

      .presented-to {
        font-size: 22px;
        letter-spacing: 3px;
        margin-bottom: 15px;
        color: #b08d57;
        text-transform: uppercase;
      }

      .recipient {
        font-size: 42px;
        font-weight: bold;
        letter-spacing: 3px;
        margin: 20px 0 60px;
        color: #1a1a1a;
        text-transform: uppercase;
        position: relative;
        padding: 0 20px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .recipient:before,
      .recipient:after {
        content: "✧";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 24px;
        color: #d4af37;
      }

      .recipient:before {
        left: -10px;
      }

      .recipient:after {
        right: -10px;
      }

      .description {
        font-size: 18px;
        line-height: 1.8;
        max-width: 600px;
        margin-bottom: 60px;
        position: relative;
        padding: 0 20px;
        color: #444;
      }

      .highlight {
        color: #b08d57;
        font-weight: bold;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
      }

      .signature {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
      }

      .signature-line {
        width: 300px;
        height: 2px;
        background: linear-gradient(
          to right,
          transparent,
          #d4af37,
          transparent
        );
        margin: 10px 0;
      }

      .signature-name {
        font-size: 24px;
        font-weight: bold;
        margin-top: 10px;
        color: #1a1a1a;
      }

      .signature-title {
        font-size: 18px;
        color: #b08d57;
        font-style: italic;
      }

      .date {
        position: absolute;
        bottom: 40px;
        left: 40px;
        font-size: 16px;
        color: #b08d57;
        letter-spacing: 1px;
      }

      .controls {
        position: absolute;
        top: 20px;
        right: 20px;
        display: flex;
        gap: 10px;
      }

      .print-btn {
        background: linear-gradient(to bottom, #d4af37, #b08d57);
        color: #fff;
        border: none;
        padding: 12px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        z-index: 10;
        font-family: "Segoe UI", sans-serif;
      }

      .print-btn:hover {
        background: linear-gradient(to bottom, #b08d57, #d4af37);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }

      /* PRINT-SPECIFIC STYLES */
      @media print {
        @page {
          margin: 0;
          size: A4 portrait;
        }

        body {
          background: none;
          padding: 0;
          margin: 0;
          width: 210mm;
          height: 297mm;
        }

        .controls {
          display: none;
        }

        .certificate-container {
          box-shadow: none;
          margin: 0;
          padding: 20mm;
          width: 210mm;
          height: 297mm;
          page-break-after: avoid;
          page-break-before: avoid;
          border: 15px solid #d4af37;
        }

        /* Force background to print */
        .certificate-container {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    </style>
  </head>
  <body>
    <div class="certificate-container">
      <div class="corner-decoration corner-tl"></div>
      <div class="corner-decoration corner-tr"></div>
      <div class="corner-decoration corner-bl"></div>
      <div class="corner-decoration corner-br"></div>

      <div class="logo-container">
        <img
          src="https://cntacademy.com/static/media/CNT-logo.628983cbb7265a447669.png"
          alt="CNT Academy Logo"
          class="logo"
        />
      </div>

      <div class="content">
        <h1>CERTIFICATE<br />OF COMPLETION</h1>

        <div class="presented-to">PROUDLY PRESENTED TO:</div>
        <div class="recipient">${userName}</div>

        <div class="description">
          We proudly certify that
          <span class="highlight">${userName}</span> has successfully completed
          the <span class="highlight">${courseName}</span> course
          at CNT Academy, demonstrating dedication and proficiency throughout
          the learning journey. This accomplishment reflects their commitment to
          personal and professional growth, equipping them with essential skills
          and knowledge for future success.
        </div>

        <div class="signature">
          <div>This certificate was awarded by:</div>
          <div class="signature-line"></div>
          <div class="signature-name">VIIKASH BAGARIA</div>
          <div class="signature-title">Mentor & Founder, CNT Academy</div>
        </div>
      </div>

      <div class="date">Issued: ${issueDate}</div>
  </body>
</html>
`;
