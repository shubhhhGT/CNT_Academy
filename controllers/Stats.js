const SiteStats = require("../models/SiteStats");
const Course = require("../models/Course");

exports.getStatsData = async (req, res) => {
  try {
    const courses = await Course.find({ status: "Published" });

    const totalCourses = courses.length;

    const totalStudents = courses.reduce(
      (acc, course) => acc + (course.studentsEntrolled?.length || 0),
      0
    );

    // Fetch latest social stats from DB
    const siteStats = await SiteStats.findOne().sort({ updatedAt: -1 });

    const youtubeSubscribers = siteStats?.youtubeSubscribers || 0;
    const instagramFollowers = siteStats?.instagramFollowers || 0;

    return res.status(200).json({
      success: true,
      data: {
        totalCourses,
        totalStudents,
        youtubeSubscribers,
        instagramFollowers,
      },
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching stats",
    });
  }
};

exports.updateSocialStats = async (req, res) => {
  try {
    const { youtubeSubscribers, instagramFollowers } = req.body;

    if (
      typeof youtubeSubscribers !== "number" ||
      typeof instagramFollowers !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input: must be numbers",
      });
    }

    let siteStats = await SiteStats.findOne();

    if (siteStats) {
      siteStats.youtubeSubscribers = youtubeSubscribers;
      siteStats.instagramFollowers = instagramFollowers;
      await siteStats.save();
    } else {
      siteStats = await SiteStats.create({
        youtubeSubscribers,
        instagramFollowers,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Social stats updated successfully",
      data: siteStats,
    });
  } catch (error) {
    console.error("Update Social Stats Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update social stats",
    });
  }
};
