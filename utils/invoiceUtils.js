const { toWords } = require("number-to-words");

exports.calculateGstAmount = (rate, quantity, gstPercent = 18) => {
  return ((rate * quantity * gstPercent) / 100).toFixed(2);
};

exports.formatAmountInWords = (amount) => {
  const rounded = Math.floor(amount);
  return (
    toWords(rounded).replace(/^\w/, (c) => c.toUpperCase()) + " rupees only"
  );
};

exports.getCurrentDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-IN"); // e.g., 25/03/2024
};
