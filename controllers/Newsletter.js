const NewsletterSubscriber = require("../models/Newsletter");

// Create a new subscriber
exports.subscribeToNewsletter = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if already subscribed
    const exists = await NewsletterSubscriber.findOne({ email });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "Already subscribed" });
    }

    const subscriber = await NewsletterSubscriber.create({ name, email });
    res.status(201).json({ success: true, data: subscriber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Subscription failed" });
  }
};

// Get all subscribers (for admin)
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await NewsletterSubscriber.find().sort({
      signupDate: -1,
    });
    res.status(200).json({ success: true, data: subscribers });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch subscribers" });
  }
};
