const generatePdf = require("../utils/generatePdf");
const { invoiceTemplate } = require("../mail/invoiceTemplate/invoice");
const {
  westBengalInvoiceTemplate,
} = require("../mail/invoiceTemplate/westBengalInvoice");
const Invoice = require("../models/Invoice");
const { uploadFileToS3 } = require("../utils/uploadInvoiceToS3");
const {
  calculateGstAmount,
  formatAmountInWords,
  getCurrentDate,
} = require("../utils/invoiceUtils");
const { generateInvoiceNumber } = require("../utils/generateInvoiceNumber");

exports.downloadInvoice = async (invoiceData) => {
  try {
    const {
      placeOfSupply,
      addressLine1,
      addressLine2,
      addressLine3,
      courseName,
      courseId,
      quantity,
      rate,
      orderId,
      customerName = "Unknown",
    } = invoiceData;

    const combinedAddress =
      `${placeOfSupply} ${addressLine1} ${addressLine2} ${addressLine3}`.toLowerCase();
    const invoiceNumber = await generateInvoiceNumber();
    const invoiceDate = getCurrentDate();
    const dueDate = getCurrentDate();
    let gstPercent = 18;
    let gstAmount = calculateGstAmount(rate, quantity, gstPercent);
    const amountInWords = formatAmountInWords(rate);
    let html = null;
    if (combinedAddress.includes("west bengal")) {
      gstPercent = 9;
      gstAmount = calculateGstAmount(rate, quantity, gstPercent);
      html = westBengalInvoiceTemplate({
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
      });
    } else {
      html = invoiceTemplate({
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
      });
    }

    const pdfBuffer = await generatePdf(html);

    const s3Key = `invoice/invoice-${invoiceNumber}.pdf`;
    const s3Url = await uploadFileToS3(pdfBuffer, s3Key, "application/pdf");

    // Save to DB
    await Invoice.create({
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
      pdfUrl: s3Url,
    });

    return s3Url; // return URL if needed
  } catch (err) {
    console.error("Error generating invoice PDF:", err);
    throw new Error("Invoice generation failed");
  }
};

exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({}).sort({ createdAt: -1 }); // Most recent first

    return res.status(200).json({
      success: true,
      message: "All invoices fetched successfully",
      data: invoices,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch invoices",
    });
  }
};
