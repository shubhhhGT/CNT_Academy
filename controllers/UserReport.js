const XLSX = require("xlsx");
const Invoice = require("../models/Invoice");

exports.downloadUserReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Start and end date are required" });
    }

    // Always take full 12 AM to 12 AM window
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // 🧠 Fetch invoices in date range + populate userId and profile
    const invoices = await Invoice.find({
      createdAt: { $gte: start, $lte: end },
    })
      .populate({
        path: "userId",
        populate: { path: "additionalDetails" }, // Pull contact number from Profile
      })
      .lean();

    if (!invoices.length) {
      return res
        .status(404)
        .json({ message: "No invoices found in date range" });
    }

    // 🧾 Build Excel data directly from populated data
    const data = invoices.map((invoice) => {
      const address =
        `${invoice.addressLine1} ${invoice.addressLine2} ${invoice.addressLine3}`.trim();
      const state = invoice.placeOfSupply;

      // 🧠 Safely access user info
      const userEmail = invoice.userId?.email || "";
      const userPhone = invoice.userId?.additionalDetails?.contactNumber || "";
      const userName =
        `${invoice.userId?.firstName || ""} ${
          invoice.userId?.lastName || ""
        }`.trim() || invoice.customerName;

      // 🧾 West Bengal GST split logic
      const isWestBengal = /(west\s*ben?gal|wb)/i.test(
        address.replace(/\s/g, "")
      );
      let cgst = 0,
        sgst = 0,
        igst = 0;
      if (isWestBengal) {
        cgst = invoice.gstAmount / 2;
        sgst = invoice.gstAmount / 2;
      } else {
        igst = invoice.gstAmount;
      }

      return {
        "Customer Name": userName,
        "Email ID": userEmail,
        "Phone Number": userPhone,
        Address: address,
        "State / Place of Supply": state,
        "Date of Purchase": invoice.invoiceDate,
        "Invoice Number": invoice.invoiceNumber,
        "Course Name(s)": Array.isArray(invoice.courseName)
          ? invoice.courseName.join(", ")
          : invoice.courseName,
        "Course Price (₹)": invoice.rate?.toFixed(2) || "0.00",
        "GST %": invoice.gstPercent || 18,
        "CGST (₹)": cgst.toFixed(2),
        "SGST (₹)": sgst.toFixed(2),
        "IGST (₹)": igst.toFixed(2),
        "Total GST (₹)": invoice.gstAmount?.toFixed(2) || "0.00",
        "Total Amount (Incl. GST) (₹)": (
          (invoice.rate || 0) + (invoice.gstAmount || 0)
        ).toFixed(2),
      };
    });

    // 🧮 Create Excel workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Report");

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    // 🧾 Set headers for download
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="user_report_${startDate}_to_${endDate}.xlsx"`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (error) {
    console.error("Error generating user report:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
