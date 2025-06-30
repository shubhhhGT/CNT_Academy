const { downloadInvoice } = require("../controllers/Invoice");
const Course = require("../models/Course");

exports.generateAndUploadInvoice = async ({
  billingInfo,
  courseIds,
  orderId,
  amountPaid,
}) => {
  const courseDetails = await Course.find({ _id: { $in: courseIds } });

  const invoicePayload = {
    ...billingInfo,
    courseId: courseIds.join(", "),
    courseName: courseDetails.map((c) => c.courseName).join(", "),
    quantity: courseIds.length,
    rate: amountPaid,
    orderId,
    customerName: billingInfo?.nameOnInvoice || "Unknown",
  };

  return await downloadInvoice(invoicePayload);
};
