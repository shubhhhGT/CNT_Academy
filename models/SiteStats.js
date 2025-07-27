const mongoose = require("mongoose");

const siteStatsSchema = new mongoose.Schema(
  {
    youtubeSubscribers: { type: Number, required: true },
    instagramFollowers: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteStats", siteStatsSchema);
