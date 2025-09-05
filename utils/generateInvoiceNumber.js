const InvoiceCounter = require("../models/InvoiceCounter");

async function generateInvoiceNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 01–12
  const yearMonth = `${year}${month}`;

  const counter = await InvoiceCounter.findOneAndUpdate(
    { yearMonth },
    { $inc: { sequence: 1 } },
    { new: true, upsert: true }
  );

  const sequence = String(counter.sequence).padStart(4, "0"); // 0001, 0002, ...
  return `INV-${year}-${month}-${sequence}`;
}

module.exports = { generateInvoiceNumber };
