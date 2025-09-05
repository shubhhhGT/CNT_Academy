exports.westBengalInvoiceTemplate = ({
  invoiceNumber,
  invoiceDate,
  dueDate,
  placeOfSupply,
  customerName,
  addressLine1,
  addressLine2,
  addressLine3,
  courseName,
  courseId,
  quantity,
  rate,
  gstPercent,
  gstAmount,
  amountInWords,
  orderId,
}) =>
  `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>${invoiceNumber}</title>
    <style type="text/css">
      * {
        margin: 0;
        padding: 0;
        text-indent: 0;
      }
      .s1 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 12pt;
      }
      .s2 {
        color: black;
        font-family: "Microsoft Sans Serif", sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 8pt;
      }
      .s3 {
        color: black;
        font-family: "Microsoft Sans Serif", sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 8pt;
      }
      .s4 {
        color: black;
        font-family: "Microsoft Sans Serif", sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 22pt;
      }
      .s5 {
        color: #333;
        font-family: "Microsoft Sans Serif", sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 8pt;
      }
      .s6 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 8pt;
      }
      .s7 {
        color: #333;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 8pt;
      }
      .s8 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 9pt;
      }
      .s9 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: italic;
        font-weight: bold;
        text-decoration: none;
        font-size: 8pt;
      }
      .s10 {
        color: #666;
        font-family: "Microsoft Sans Serif", sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 7.5pt;
      }
      .s11 {
        color: #f00;
        font-family: "Microsoft Sans Serif", sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 8pt;
      }
      p {
        color: black;
        font-family: "Microsoft Sans Serif", sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 8pt;
        margin: 0pt;
      }
      li {
        display: block;
      }
      #l1 {
        padding-left: 0pt;
        counter-reset: c1 2;
      }
      #l1 > li > *:first-child:before {
        counter-increment: c1;
        content: counter(c1, decimal) ". ";
        color: black;
        font-family: "Microsoft Sans Serif", sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 8pt;
      }
      #l1 > li:first-child > *:first-child:before {
        counter-increment: c1 0;
      }
      li {
        display: block;
      }
      #l2 {
        padding-left: 0pt;
        counter-reset: d1 5;
      }
      #l2 > li > *:first-child:before {
        counter-increment: d1;
        content: counter(d1, decimal) ". ";
        color: black;
        font-family: "Microsoft Sans Serif", sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 8pt;
      }
      #l2 > li:first-child > *:first-child:before {
        counter-increment: d1 0;
      }
      table,
      tbody {
        vertical-align: top;
        overflow: visible;
      }
    </style>
  </head>
  <body>
    <table
      style="
        border-collapse: collapse;
        margin-left: 15.975pt;
        margin-top: 15.975pt;
        margin-right: 15.975pt;
        margin-bottom: 15.975pt;
      "
      cellspacing="0"
    >
      <tr style="height: 107pt">
        <td
          style="
            width: 90pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
          "
          colspan="3"
        >
          <p style="text-indent: 0pt; text-align: left"><br /></p>
          <p style="text-indent: 0pt; text-align: left">
            <span
              ><table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <img
                      width="150"
                      height="81"
                      src="	https://cntacademy.com/static/media/CNT-logo.628983cbb7265a447669.png"
                    />
                  </td>
                </tr></table
            ></span>
          </p>
        </td>
        <td
          style="
            width: 252pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
          "
          colspan="4"
        >
          <p
            class="s1"
            style="
              padding-top: 1pt;
              padding-left: 45pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            AGNOSTIC EDUFIN PVT LTD
          </p>
          <p
            class="s2"
            style="
              padding-top: 4pt;
              padding-left: 45pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            212 GIRISH GHOSH ROAD,FOURTH FLOOR, ROOM NO
          </p>
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-left: 45pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            430 , RANGOLI MALL
          </p>
          <p
            class="s2"
            style="padding-left: 45pt; text-indent: 0pt; text-align: left"
          >
            Belur
          </p>
          <p
            class="s2"
            style="
              padding-left: 45pt;
              padding-right: 87pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            Howrah West Bengal 711202 India
          </p>
          <p
            class="s2"
            style="
              padding-left: 45pt;
              padding-right: 110pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            GSTIN 19AAZCA2194D1Z9
          </p>
          <p
            style="
              padding-left: 45pt;
              padding-right: 87pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            <a href="http://www.cntacademy.com/" class="s3" target="_blank"
              >agnosticedufinpvtltd@gmail.com www.cntacademy.com</a
            >
          </p>
        </td>
        <td
          style="
            width: 185pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="3"
        >
          <p style="text-indent: 0pt; text-align: left"><br /></p>
          <p
            class="s4"
            style="padding-left: 48pt; text-indent: 0pt; text-align: left"
          >
            TAX INVOICE
          </p>
        </td>
      </tr>
      <tr style="height: 51pt">
        <td
          style="
            width: 90pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
          "
          colspan="3"
        >
          <p
            class="s5"
            style="
              padding-top: 1pt;
              padding-left: 4pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            #
          </p>
          <p
            class="s5"
            style="
              padding-top: 1pt;
              padding-left: 4pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            rzp_orderid
          </p>
          <p
            class="s5"
            style="
              padding-top: 1pt;
              padding-left: 4pt;
              padding-right: 20pt;
              text-indent: 0pt;
              line-height: 121%;
              text-align: left;
            "
          >
            Invoice Date
          </p>
          <p
            class="s5"
            style="
              padding-top: 1pt;
              padding-left: 4pt;
              padding-right: 20pt;
              text-indent: 0pt;
              line-height: 121%;
              text-align: left;
            "
          >
            Terms
          </p>
          <p
            class="s5"
            style="
              padding-left: 4pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            Due Date
          </p>
        </td>
        <td
          style="
            width: 173pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="2"
        >
          <p
            class="s6"
            style="padding-left: 41pt; text-indent: 0pt; text-align: left"
          >
            : ${invoiceNumber}
          </p>
          <p
            class="s6"
            style="padding-left: 41pt; text-indent: 0pt; text-align: left"
          >
            : ${orderId}
          </p>
          <p
            class="s6"
            style="
              padding-top: 1pt;
              padding-left: 41pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            : ${invoiceDate}
          </p>
          <p
            class="s6"
            style="
              padding-top: 1pt;
              padding-left: 41pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            : Due On Receipt
          </p>
          <p
            class="s6"
            style="
              padding-top: 1pt;
              padding-left: 41pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            : ${dueDate}
          </p>
        </td>
        <td
          style="
            width: 79pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
          "
          colspan="2"
        >
          <p
            class="s5"
            style="
              padding-top: 1pt;
              padding-left: 4pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            Place Of Supply
          </p>
        </td>
        <td
          style="
            width: 185pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="3"
        >
          <p
            class="s6"
            style="padding-left: 52pt; text-indent: 0pt; text-align: left"
          >
            : ${placeOfSupply}
          </p>
        </td>
      </tr>
      <tr style="height: 11pt">
        <td
          style="
            width: 263pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
          bgcolor="#F2F2F3"
        >
          <p
            class="s7"
            style="
              padding-left: 4pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            Bill To
          </p>
        </td>
        <td
          style="
            width: 264pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
          bgcolor="#F2F2F3"
        >
          <p
            class="s7"
            style="
              padding-left: 4pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            Ship To
          </p>
        </td>
      </tr>
      <tr style="height: 16pt">
        <td
          style="
            width: 263pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
        >
          <p
            class="s8"
            style="
              padding-top: 4pt;
              padding-left: 4pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: left;
            "
          >
            ${customerName}
          </p>
        </td>
        <td
          style="
            width: 264pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
        >
          <p
            class="s2"
            style="
              padding-top: 5pt;
              padding-left: 4pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            ${addressLine1}
          </p>
        </td>
      </tr>
      <tr style="height: 12pt">
        <td
          style="
            width: 263pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
        >
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-left: 4pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            ${addressLine1}
          </p>
        </td>
        <td
          style="
            width: 264pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
        >
          <p
            class="s2"
            style="padding-left: 4pt; text-indent: 0pt; text-align: left"
          >
            ${addressLine2}
          </p>
        </td>
      </tr>
      <tr style="height: 12pt">
        <td
          style="
            width: 263pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
        >
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-left: 4pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            ${addressLine2}
          </p>
        </td>
        <td
          style="
            width: 264pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
        >
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-left: 4pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            ${addressLine3}
          </p>
        </td>
      </tr>
      <tr style="height: 12pt">
        <td
          style="
            width: 263pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
        >
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-left: 4pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            ${addressLine3}
          </p>
        </td>
        <td
          style="
            width: 264pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
        >
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-left: 4pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            India
          </p>
        </td>
      </tr>
      <tr style="height: 19pt">
        <td
          style="
            width: 263pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
        >
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-left: 4pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            India
          </p>
        </td>
        <td
          style="
            width: 264pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
        >
          <p style="text-indent: 0pt; text-align: left"><br /></p>
        </td>
      </tr>
      <tr style="height: 42pt">
        <td
          style="
            width: 527pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="10"
        >
          <p
            class="s5"
            style="
              padding-top: 7pt;
              padding-left: 7pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            Subject :
          </p>
          <p
            class="s2"
            style="
              padding-top: 6pt;
              padding-left: 7pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            ${courseName}
          </p>
        </td>
      </tr>
      <tr style="height: 15pt">
        <td
          style="
            width: 27pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          rowspan="2"
          bgcolor="#F2F2F3"
        >
          <p style="padding-top: 6pt; text-indent: 0pt; text-align: left">
            <br />
          </p>
          <p class="s6" style="text-indent: 0pt; text-align: center">#</p>
        </td>
        <td
          style="
            width: 185pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          rowspan="2"
          bgcolor="#F2F2F3"
        >
          <p style="padding-top: 6pt; text-indent: 0pt; text-align: left">
            <br />
          </p>
          <p
            class="s6"
            style="padding-left: 5pt; text-indent: 0pt; text-align: left"
          >
            Item &amp; Description
          </p>
        </td>
        <td
          style="
            width: 40pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          rowspan="2"
          bgcolor="#F2F2F3"
        >
          <p style="padding-top: 6pt; text-indent: 0pt; text-align: left">
            <br />
          </p>
          <p
            class="s6"
            style="padding-left: 5pt; text-indent: 0pt; text-align: left"
          >
            HSN/SAC
          </p>
        </td>
        <td
          style="
            width: 40pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          rowspan="2"
          bgcolor="#F2F2F3"
        >
          <p style="padding-top: 6pt; text-indent: 0pt; text-align: left">
            <br />
          </p>
          <p
            class="s6"
            style="padding-left: 37pt; text-indent: 0pt; text-align: left"
          >
            Qty
          </p>
        </td>
        <td
          style="
            width: 40pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          rowspan="2"
          bgcolor="#F2F2F3"
        >
          <p style="padding-top: 6pt; text-indent: 0pt; text-align: left">
            <br />
          </p>
          <p
            class="s6"
            style="padding-left: 34pt; text-indent: 0pt; text-align: left"
          >
            Rate
          </p>
        </td>
        <td
          style="
            width: 58pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="2"
          bgcolor="#F2F2F3"
        >
          <p
            class="s6"
            style="padding-top: 3pt; text-indent: 0pt; text-align: center"
          >
            CGST
          </p>
        </td>
        <td
          style="
            width: 58pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="2"
          bgcolor="#F2F2F3"
        >
          <p
            class="s6"
            style="padding-top: 3pt; text-indent: 0pt; text-align: center"
          >
            SGST
          </p>
        </td>
        <td
          style="
            width: 69pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          rowspan="2"
          bgcolor="#F2F2F3"
        >
          <p style="padding-top: 6pt; text-indent: 0pt; text-align: left">
            <br />
          </p>
          <p
            class="s6"
            style="padding-left: 32pt; text-indent: 0pt; text-align: left"
          >
            Amount
          </p>
        </td>
      </tr>
      <tr style="height: 11pt">
        <td
          style="
            width: 29pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          bgcolor="#F2F2F3"
        >
          <p
            class="s6"
            style="
              padding-right: 3pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: right;
            "
          >
            %
          </p>
        </td>
        <td
          style="
            width: 29pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          bgcolor="#F2F2F3"
        >
          <p
            class="s6"
            style="
              padding-right: 3pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: right;
            "
          >
            Amt
          </p>
        </td>
        <td
          style="
            width: 29pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          bgcolor="#F2F2F3"
        >
          <p
            class="s6"
            style="
              padding-right: 3pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: right;
            "
          >
            %
          </p>
        </td>
        <td
          style="
            width: 29pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          bgcolor="#F2F2F3"
        >
          <p
            class="s6"
            style="
              padding-right: 3pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: right;
            "
          >
            Amt
          </p>
        </td>
      </tr>
      <tr style="height: 20pt">
        <td
          style="
            width: 27pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
        >
          <p
            class="s2"
            style="padding-top: 1pt; text-indent: 0pt; text-align: center"
          >
            1
          </p>
        </td>
        <td
          style="
            width: 185pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
        >
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-left: 4pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            ${courseName}
          </p>
        </td>
        <td
          style="
            width: 40pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
        >
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-left: 4pt;
              text-indent: 0pt;
              text-align: center;
            "
          >
            999294
          </p>
        </td>
        <td
          style="
            width: 40pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
        >
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-right: 3pt;
              text-indent: 0pt;
              text-align: center;
            "
          >
            ${quantity}.00
          </p>
        </td>
        <td
          style="
            width: 40pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
        >
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-left: 18pt;
              text-indent: 0pt;
              text-align: center;
            "
          >
            ${rate.toFixed(2)}
          </p>
        </td>
        <td
          style="
            width: 29pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
        >
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-right: 3pt;
              text-indent: 0pt;
              text-align: right;
            "
          >
            ${gstPercent}%
          </p>
        </td>
        <td
          style="
            width: 29pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
        >
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-right: 3pt;
              text-indent: 0pt;
              text-align: right;
            "
          >
            ${gstAmount}
          </p>
        </td>
        <td
          style="
            width: 29pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
        >
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-right: 3pt;
              text-indent: 0pt;
              text-align: right;
            "
          >
            ${gstPercent}%
          </p>
        </td>
        <td
          style="
            width: 29pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
        >
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-right: 3pt;
              text-indent: 0pt;
              text-align: right;
            "
          >
            ${gstAmount}
          </p>
        </td>
        <td
          style="
            width: 69pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
        >
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-right: 3pt;
              text-indent: 0pt;
              text-align: right;
            "
          >
            ${rate.toFixed(2)}
          </p>
        </td>
      </tr>
      <tr style="height: 36pt">
        <td
          style="
            width: 297pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
        >
          <p style="padding-top: 1pt; text-indent: 0pt; text-align: left">
            <br />
          </p>
          <p
            class="s2"
            style="padding-left: 5pt; text-indent: 0pt; text-align: left"
          >
            Total In Words
          </p>
          <p
            class="s9"
            style="padding-left: 5pt; text-indent: 0pt; text-align: left"
          >
            ${amountInWords}
          </p>
        </td>
        <td
          style="
            width: 45pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
          "
        >
          <p style="text-indent: 0pt; text-align: left"><br /></p>
        </td>
        <td
          style="
            width: 116pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
          "
          colspan="3"
        >
          <p
            class="s2"
            style="
              padding-top: 3pt;
              padding-left: 37pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            Sub Total
          </p>
          <p
            class="s10"
            style="padding-left: 37pt; text-indent: 0pt; text-align: left"
          >
            (Tax Inclusive)
          </p>
          <p
            class="s2"
            style="
              padding-top: 3pt;
              padding-left: 37pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            CGST9 (${gstPercent}%)
          </p>
          <p
            class="s2"
            style="
              padding-top: 3pt;
              padding-left: 37pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            SGST9 (${gstPercent}%)
          </p>
        </td>
        <td
          style="
            width: 69pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="3"
        >
          <p
            class="s2"
            style="
              padding-top: 8pt;
              padding-left: 27pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            ${rate.toFixed(2)}
          </p>
          <p
            class="s2"
            style="
              padding-top: 7pt;
              padding-left: 27pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            ${gstAmount}
          </p>
          <p
            class="s2"
            style="
              padding-top: 2pt;
              padding-left: 27pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            ${gstAmount}
          </p>
        </td>
      </tr>
      <tr style="height: 24pt">
        <td
          style="
            width: 297pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
        >
          <p
            class="s5"
            style="
              padding-top: 5pt;
              padding-left: 5pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            Notes
          </p>
        </td>
        <td
          style="
            width: 45pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
          "
        >
          <p style="text-indent: 0pt; text-align: left"><br /></p>
        </td>
        <td style="width: 116pt" colspan="3">
          <p
            class="s6"
            style="
              padding-top: 1pt;
              padding-left: 65pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            Total
          </p>
          <p
            class="s2"
            style="
              padding-top: 3pt;
              padding-left: 31pt;
              text-indent: 0pt;
              line-height: 8pt;
              text-align: left;
            "
          >
            Payment Made
          </p>
        </td>
        <td
          style="
            width: 69pt;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
        >
          <p
            class="s6"
            style="
              padding-top: 1pt;
              padding-left: 27pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            ${rate.toFixed(2)}
          </p>
          <p
            class="s11"
            style="
              padding-top: 3pt;
              padding-left: 27pt;
              text-indent: 0pt;
              line-height: 8pt;
              text-align: left;
            "
          >
            (-)${rate.toFixed(2)}
          </p>
        </td>
      </tr>
      <tr style="height: 17pt">
        <td
          style="
            width: 297pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
        >
          <p
            class="s2"
            style="padding-left: 5pt; text-indent: 0pt; text-align: left"
          >
            Thanks for your business.
          </p>
        </td>
        <td
          style="
            width: 45pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
          "
        >
          <p style="text-indent: 0pt; text-align: left"><br /></p>
        </td>
        <td
          style="
            width: 116pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
          "
          colspan="3"
        >
          <p
            class="s8"
            style="
              padding-top: 2pt;
              padding-left: 32pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            Balance Due
          </p>
        </td>
        <td
          style="
            width: 69pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="2"
        >
          <p
            class="s8"
            style="
              padding-top: 2pt;
              padding-right: 19pt;
              text-indent: 0pt;
              text-align: right;
            "
          >
            0.00
          </p>
        </td>
      </tr>
      <tr style="height: 40pt">
        <td
          style="
            width: 297pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
        >
          <p
            class="s5"
            style="
              padding-top: 7pt;
              padding-left: 5pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            Terms &amp; Conditions
          </p>
          <p
            class="s2"
            style="
              padding-left: 5pt;
              padding-right: 20pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            Terms and Conditions for CNT Academy (A Brand of Agnostic Edufin Pvt
            Ltd)
          </p>
        </td>
        <td
          style="
            width: 230pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-top-color: #9e9e9e;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
          rowspan="3"
        >
          <p style="text-indent: 0pt; text-align: left"><br /></p>
          <p>
            <img
              src="https://chartntrade-backend-bucket-1.s3.ap-south-1.amazonaws.com/CNT_Academy/AHazara.png"
              width="150pt"
              height="81pt"
              style="padding-left: 50pt"
            />
          </p>
          <p
            class="s2"
            style="
              padding-left: 76pt;
              text-indent: 0pt;
              line-height: 8pt;
              text-align: left;
            "
          >
            Authorized Signature
          </p>
        </td>
      </tr>
      <tr style="height: 18pt">
        <td
          style="
            width: 297pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
        >
          <p
            class="s2"
            style="
              padding-top: 4pt;
              padding-left: 5pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            1. Introduction
          </p>
        </td>
      </tr>
      <tr style="height: 14pt">
        <td
          style="
            width: 297pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="5"
        >
          <p
            class="s2"
            style="
              padding-top: 4pt;
              padding-left: 5pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            Welcome to CNT Academy, operated by Agnostic Edufin Pvt Ltd
          </p>
        </td>
      </tr>
      <tr style="height: 261pt">
        <td
          style="
            width: 527pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-left-color: #9e9e9e;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-bottom-color: #9e9e9e;
            border-right-style: solid;
            border-right-width: 1pt;
            border-right-color: #9e9e9e;
          "
          colspan="10"
        >
          <p
            class="s2"
            style="
              padding-left: 5pt;
              text-indent: 0pt;
              line-height: 8pt;
              text-align: left;
            "
          >
            (&quot;Company&quot;). By enrolling in our courses and using our
            services, you
          </p>
          <p
            class="s2"
            style="
              padding-left: 5pt;
              padding-right: 360pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            agree to comply with and be bound by the following terms and
            conditions. Please review them carefully.
          </p>
          <p style="text-indent: 0pt; text-align: left"><br /></p>
          <!-- Side-by-side ordered lists -->
          <div style="display: flex; justify-content: space-between; gap: 20pt">
            <!-- First column -->
            <ol id="l1" style="flex: 1; margin: 0; padding-right: 20pt">
              <li data-list-text="2.">
                <p class="s2" style="padding-left: 13pt; text-indent: -8pt">
                  Services Provided
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
                <p class="s2" style="padding-left: 5pt; text-align: justify">
                  CNT Academy offers educational courses related to financial
                  markets, investment strategies, and related topics. Our
                  services are intended solely for educational purposes and do
                  not constitute financial advice or recommendations.
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
              </li>

              <li data-list-text="3.">
                <p class="s2" style="padding-left: 13pt; text-indent: -8pt">
                  Payment Terms
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
                <p class="s2" style="padding-left: 5pt; text-align: justify">
                  Fees: All course fees must be paid in full at the time of
                  enrollment. Fees are non-refundable except as outlined in our
                  Refund Policy.
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
                <p class="s2" style="padding-left: 5pt; text-align: justify">
                  Invoices: An invoice will be issued upon receipt of payment,
                  detailing the services purchased.
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
              </li>

              <li data-list-text="4.">
                <p class="s2" style="padding-left: 13pt; text-indent: -8pt">
                  Compliance with SEBI Regulations
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
                <p class="s2" style="padding-left: 5pt; text-align: justify">
                  In accordance with the Securities and Exchange Board of India
                  (SEBI) circular issued on January 29, 2025, CNT Academy
                  adheres to the following guidelines:
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
                <p class="s2" style="padding-left: 5pt; text-align: justify">
                  Use of Market Data: Educational content will not include
                  market price data from the preceding three months. This
                  measure ensures that our courses remain purely educational and
                  do not provide real-time trading tips or investment advice.
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
                <p class="s2" style="padding-left: 5pt; text-align: justify">
                  No Investment Advice: Our instructors and materials do not
                  offer investment advice or make performance claims. The
                  content is designed to enhance your understanding of financial
                  markets without recommending specific investment actions.
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
              </li>
            </ol>

            <!-- Second column -->
            <ol
              id="l2"
              style="flex: 1; margin: 0; padding-left: 20pt; padding-right: 5pt"
            >
              <li data-list-text="5.">
                <p class="s2" style="padding-left: 13pt; text-indent: -8pt">
                  Intellectual Property
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
                <p class="s2" style="padding-left: 5pt; text-align: justify">
                  All course materials, including but not limited to videos,
                  texts, and graphics, are the intellectual property of CNT
                  Academy and are protected by copyright laws. Unauthorized
                  reproduction or distribution is prohibited.
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
              </li>

              <li data-list-text="6.">
                <p class="s2" style="padding-left: 13pt; text-indent: -8pt">
                  Limitation of Liability
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
                <p class="s2" style="padding-left: 5pt; text-align: justify">
                  CNT Academy and Agnostic Edufin Pvt Ltd are not liable for any
                  direct, indirect, incidental, or consequential damages arising
                  from the use of our educational materials. Enrollment does not
                  guarantee success in financial markets.
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
              </li>

              <li data-list-text="7.">
                <p class="s2" style="padding-left: 13pt; text-indent: -8pt">
                  Amendments
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
                <p class="s2" style="padding-left: 5pt; text-align: justify">
                  We reserve the right to modify these terms and conditions at
                  any time. Changes will be communicated through our official
                  channels and will take effect immediately upon posting.
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
              </li>

              <li data-list-text="8.">
                <p class="s2" style="padding-left: 13pt; text-indent: -8pt">
                  Governing Law
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
                <p class="s2" style="padding-left: 5pt; text-align: justify">
                  These terms and conditions are governed by the laws of India.
                  Any disputes arising shall be subject to the exclusive
                  jurisdiction of the courts in Kolkata, West Bengal.
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
                <p class="s2" style="padding-left: 5pt; text-align: justify">
                  By enrolling in CNT Academy courses, you acknowledge that you
                  have read, understood, and agreed to these terms and
                  conditions.
                </p>
                <p style="text-indent: 0pt; text-align: left"><br /></p>
              </li>
            </ol>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
