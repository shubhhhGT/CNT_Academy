const puppeteer = require("puppeteer-core");
const getChromePath = require("./getChromePath");

const generatePdf = async (htmlContent) => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: getChromePath(),
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({ format: "A4" });

  await browser.close();
  return pdfBuffer;
};

module.exports = generatePdf;
