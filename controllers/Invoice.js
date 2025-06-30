const generatePdf = require("../utils/generatePdf");
const { invoiceTemplate } = require("../mail/invoiceTemplate/invoice");
const Invoice = require("../models/Invoice");
const { uploadFileToS3 } = require("../utils/uploadInvoiceToS3");
const {
  calculateGstAmount,
  formatAmountInWords,
  getCurrentDate,
} = require("../utils/invoiceUtils");

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

    const invoiceNumber = Date.now().toString();
    const invoiceDate = getCurrentDate();
    const dueDate = getCurrentDate();
    const gstPercent = 18;
    const gstAmount = calculateGstAmount(rate, quantity, gstPercent);
    const amountInWords = formatAmountInWords(rate);

    const html = invoiceTemplate({
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
