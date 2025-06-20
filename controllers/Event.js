const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const { title, summary, content, thumbnail, meetingLink, date, price } =
      req.body;
    const createdBy = req.user.id;

    if (
      !title ||
      !summary ||
      !content ||
      !thumbnail ||
      !meetingLink ||
      !date ||
      !price
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const event = await Event.create({
      title,
      summary,
      content,
      thumbnail,
      meetingLink,
      date,
      price,
      createdBy,
    });
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create event" });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}, "-meetingLink") // exclude meeting link
      .sort({ date: 1 });
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch events" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).select("-meetingLink"); // hide link
    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error retrieving event" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id, updates } = req.body;

    const event = await Event.findByIdAndUpdate(id, updates, { new: true });

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.body;

    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete event" });
  }
};
