const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Testimonial = require("../models/Testimonial");
const User = require("../models/User");

// Create Testimonial
exports.createTestimonial = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, rating, review, videoUrl } = req.body;

    // 1. Validate: User must be enrolled in course
    const course = await Course.findOne({
      _id: courseId,
      studentsEntrolled: { $elemMatch: { $eq: userId } },
    }).populate("courseContent.subSections");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "You're not enrolled in this course.",
      });
    }

    // 2. Check if user completed all videos
    const courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    const totalVideos = course.courseContent
      .flatMap((section) => section.subSections)
      .map((subSection) => subSection._id.toString());

    const completedVideos =
      courseProgress?.completedVideos.map((v) => v.toString()) || [];

    const hasCompletedCourse = totalVideos.every((videoId) =>
      completedVideos.includes(videoId)
    );

    if (!hasCompletedCourse) {
      return res.status(403).json({
        success: false,
        message:
          "Please complete the entire course before adding a testimonial.",
      });
    }

    // 3. Check if testimonial already exists
    const alreadyGiven = await Testimonial.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyGiven) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a testimonial for this course.",
      });
    }

    // 4. Create testimonial
    const user = await User.findById(userId);

    const testimonial = await Testimonial.create({
      user: userId,
      username: `${user.firstName} ${user.lastName}`,
      course: courseId,
      rating,
      review,
      videoUrl,
    });

    return res.status(200).json({
      success: true,
      message: "Testimonial submitted successfully.",
      testimonial,
    });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating testimonial.",
    });
  }
};

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({})
      .populate({
        path: "user",
        select: "firstName lastName image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .sort({ createdAt: -1 }); // latest first

    return res.status(200).json({
      success: true,
      message: "All testimonials fetched successfully.",
      data: testimonials,
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching testimonials.",
    });
  }
};
