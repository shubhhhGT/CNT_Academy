const Category = require("../models/Category");
const User = require("../models/User");
const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const convertSecondsToDuration = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");
const RatingAndReviews = require("../models/RatingAndReview");
const { default: mongoose } = require("mongoose");

// create course handler
exports.createCourse = async (req, res) => {
  try {
    // Get user id
    const userId = req.user.id;

    // Get data from req body
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      tag: _tag,
      instructions: _instructions,
      status,
      courseType,
      thumbnailImage,
    } = req.body;

    // Convert the tag and isntructions from Stringified array to array
    const tag = JSON.parse(_tag);
    const instructions = JSON.parse(_instructions);
    console.log("tag", tag);
    console.log("instructions", instructions);

    // Validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnailImage ||
      !tag.length ||
      !instructions.length ||
      !courseType
    ) {
      return res.this.status(400).jon({
        success: false,
        message: "All fields are required",
      });
    }

    if (!status || status === undefined) {
      status = "Draft";
    }

    // Check for instructor
    const instructorDetails = await User.findById(userId, {
      accountType: "Admin",
    });
    console.log("instructor details:", instructorDetails);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      });
    }

    // check if category is valid or not
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category details not found",
      });
    }

    // Create an entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag,
      instructions,
      status: status,
      category: categoryDetails._id,
      thumbnail: thumbnailImage,
      courseType: courseType,
    });

    // Add the new course to the schema of instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    );

    // Update category schema
    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );

    // Return response
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while creating course",
    });
  }
};

// Edit course details
exports.editCourse = async (req, res) => {
  try {
    // get course Id of the course that is to be edited
    const { courseId } = req.body;
    const updates = { ...req.body };

    // Find the course
    const course = await Course.findById(courseId);

    // Validation
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // If thumbnail image is found then update it
    if (req.body.thumbnailImage) {
      console.log("thumbnail update");
      course.thumbnail = req.body.thumbnailImage;
    }

    // Update only the fields that are present in req body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error occured while updating course",
      error: error.message,
    });
  }
};

// Show all courses
exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      { status: "Published" },
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEntrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch all courses",
      error: error.message,
    });
  }
};

// getCourseDetails
exports.getCourseDetails = async (req, res) => {
  try {
    // Get ID from req body
    const { courseId } = req.body;

    // Find course details
    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSection", select: "-videoUrl" },
      })
      .exec();

    // Validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `could not find the course with ${courseId}`,
      });
    }

    // Find the total duration
    let totalDurationinSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationinSeconds = parseInt(subSection.timeDuration);
        totalDurationinSeconds += timeDurationinSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationinSeconds);

    // Return response
    return res.status(200).json({
      success: true,
      message: "course details fetched successfully",
      data: { courseDetails, totalDuration },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      mesage: "Error occured while fetching course details",
      error: error.message,
    });
  }
};

// get full course detail
exports.getFUllCourseDetails = async (req, res) => {
  try {
    // Get ID from req body
    const { courseId } = req.body;
    const userId = req.user.id;

    // Find course details
    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .populate("instructions")
      .exec();

    // Validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `could not find the course with ${courseId}`,
      });
    }

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    console.log("courseProgressCount: ", courseProgressCount);

    // Find the total duration
    let totalDurationinSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationinSeconds = parseInt(subSection.timeDuration);
        totalDurationinSeconds += timeDurationinSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationinSeconds);

    // Return response
    return res.status(200).json({
      success: true,
      message: "course details fetched successfully",
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      mesage: "Error occured while fetching full course details",
      error: error.message,
    });
  }
};

// Get a list of all courses for an instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // get instructor ID
    const instructorId = req.user.id;

    // Find all the courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    // Calculate time duration for each course
    const coursesWithTotalDuration = instructorCourses.map((course) => {
      // Find the total duration
      let totalDurationinSeconds = 0;
      course.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationinSeconds = parseInt(subSection.timeDuration);
          totalDurationinSeconds += timeDurationinSeconds;
        });
      });

      const totalDuration = convertSecondsToDuration(totalDurationinSeconds);

      // Add totalDuration to course object
      return {
        ...course.toObject(),
        totalDuration,
      };
    });

    // Return intructor courses
    res.status(200).json({
      success: true,
      data: coursesWithTotalDuration,
      // courseDuration: coursesWithTotalDuration,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    // get course id to be deleted
    const { courseId } = req.body;
    const userId = req.user.id;

    // find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    // unenroll students from course
    const studentsEntrolled = course.studentsEntrolled;
    for (const studentId of studentsEntrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    // Delete sections and sub sections
    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {
      const section = await Section.findById(sectionId);
      if (section) {
        const subsection = section.subSection;
        for (const subSectionId of subsection) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }

      // Delete section
      await Section.findByIdAndDelete(sectionId);
    }

    // Find the admin and delete the course from his list of courses
    await User.findByIdAndUpdate(userId, {
      $pull: { courses: courseId },
    });

    // Delete course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfullly",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add bookmark
exports.addBookmark = async (req, res) => {
  try {
    const { courseId } = req.body;

    // find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    const userId = req.user.id;

    // Find the user and add the courseId to bookmarks
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { bookmarks: courseId } },
      { new: true }
    );

    // Check if user was found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Bookmark added successfully",
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Remove bookmark
exports.removeBookmark = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // Find the user and remove the courseId from bookmarks
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { bookmarks: courseId } },
      { new: true } // Return the updated user document
    );

    // Check if user was found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Bookmark removed successfully",
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all bookmarks
exports.getAllBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user and populate the bookmarks
    const user = await User.findById(userId).populate("bookmarks");

    // Check if user was found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get courses by course type
exports.getCoursesByType = async (req, res) => {
  try {
    const { courseType } = req.params;

    let coursesQuery = Course.find({ status: "Published" });

    // Apply different logic if the courseType is "Most popular"
    if (courseType === "Most popular") {
      coursesQuery = coursesQuery
        .sort({ studentsEntrolled: -1 }) // Sort by the number of enrolled students in descending order
        .limit(3); // Get only the top 3 courses
    } else {
      coursesQuery = coursesQuery
        .find({ courseType: courseType }) // Filter by specific courseType
        .limit(3); // Get only the top 3 courses
    }

    // Fetch courses with only necessary fields
    const courses = await coursesQuery
      .select(
        "courseName courseDescription thumbnail courseType courseContent studentsEntrolled"
      )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "sectionName subSection",
        },
      })
      .exec();

    // Check if courses are found
    if (!courses || courses.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No courses found for this type" });
    }

    // Calculate the total number of lessons (sub-sections) for each course
    const coursesWithLessonCount = await Promise.all(
      courses.map(async (course) => {
        const totalLessons = await Section.aggregate([
          { $match: { _id: { $in: course.courseContent } } },
          { $unwind: "$subSection" },
          { $count: "totalLessons" },
        ]);

        return {
          ...course.toObject(),
          totalLessons:
            totalLessons.length > 0 ? totalLessons[0].totalLessons : 0,
        };
      })
    );

    res.status(200).json({ success: true, courses: coursesWithLessonCount });
  } catch (error) {
    console.error("Error fetching courses by type:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// exports.getStratergyCourses = async (req, res) => {
//   try {
//     // Fetch courses with the "Stratergy" course type and "Published" status
//     const courses = await Course.find({
//       courseType: "Stratergy",
//       status: "Published",
//     })
//       .select(
//         "courseName courseDescription thumbnail instructor price studentsEntrolled courseContent"
//       )
//       .populate("instructor", "firstName lastName")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//           select: "sectionName subSection timeDuration",
//         },
//       });

//     console.log(courses);

//     // Find the total duration
//     let totalDurationinSeconds = 0;
//     courses.forEach((course) => {
//       course.courseContent.forEach((content) => {
//         content.subSection.forEach((subSection) => {
//           const timeDurationinSeconds = parseInt(subSection.timeDuration);
//           totalDurationinSeconds += timeDurationinSeconds;
//         });
//       });
//     });

//     const totalDuration = convertSecondsToDuration(totalDurationinSeconds);
//     console.log(totalDuration);

//     // Check if courses are found
//     if (!courses || courses.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No courses found for Stratergy type",
//       });
//     }

//     // Calculate the average rating and total lessons for each course
//     const coursesWithDetails = await Promise.all(
//       courses.map(async (course) => {
//         // Calculate total lessons (sub-sections)
//         const totalLessons = await Section.aggregate([
//           { $match: { _id: { $in: course.courseContent } } },
//           { $unwind: "$subSection" },
//           { $count: "totalLessons" },
//         ]);

//         // Calculate average rating
//         const ratingResult = await RatingAndReviews.aggregate([
//           {
//             $match: { course: new mongoose.Types.ObjectId(course._id) },
//           },
//           {
//             $group: {
//               _id: null,
//               averageRating: { $avg: "$rating" },
//             },
//           },
//         ]);

//         return {
//           ...course.toObject(),
//           totalLessons:
//             totalLessons.length > 0 ? totalLessons[0].totalLessons : 0,
//           averageRating:
//             ratingResult.length > 0 ? ratingResult[0].averageRating : 0,
//         };
//       })
//     );

//     // Respond with the detailed course information
//     res.status(200).json({ success: true, courses: coursesWithDetails });
//   } catch (error) {
//     console.error("Error fetching Stratergy courses:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// Get courses by "Stratergy" course type
exports.getStratergyCourses = async (req, res) => {
  try {
    // Fetch courses with the "Stratergy" course type and "Published" status
    const courses = await Course.find({
      courseType: "Stratergy",
      status: "Published",
    })
      .select(
        "courseName courseDescription thumbnail instructor price studentsEntrolled courseContent"
      )
      .populate("instructor", "firstName lastName")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "sectionName subSection timeDuration",
        },
      });

    // Check if courses are found
    if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found for Stratergy type",
      });
    }

    // Calculate the average rating, total lessons, and individual total duration for each course
    const coursesWithDetails = await Promise.all(
      courses.map(async (course) => {
        // Calculate total lessons (sub-sections)
        const totalLessons = await Section.aggregate([
          { $match: { _id: { $in: course.courseContent } } },
          { $unwind: "$subSection" },
          { $count: "totalLessons" },
        ]);

        // Calculate average rating
        const ratingResult = await RatingAndReviews.aggregate([
          {
            $match: { course: new mongoose.Types.ObjectId(course._id) },
          },
          {
            $group: {
              _id: null,
              averageRating: { $avg: "$rating" },
            },
          },
        ]);

        // Calculate total duration for the current course
        let totalDurationinSeconds = 0;
        course.courseContent.forEach((content) => {
          content.subSection.forEach((subSection) => {
            const timeDurationinSeconds = parseInt(subSection.timeDuration, 10);
            if (!isNaN(timeDurationinSeconds)) {
              totalDurationinSeconds += timeDurationinSeconds;
            }
          });
        });

        const totalDuration = convertSecondsToDuration(totalDurationinSeconds);

        return {
          ...course.toObject(),
          totalLessons:
            totalLessons.length > 0 ? totalLessons[0].totalLessons : 0,
          averageRating:
            ratingResult.length > 0 ? ratingResult[0].averageRating : 0,
          totalTime: totalDuration, // Add total time to the course object
        };
      })
    );

    // Respond with the detailed course information
    res.status(200).json({ success: true, courses: coursesWithDetails });
  } catch (error) {
    console.error("Error fetching Stratergy courses:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getCoursesByTags = async (req, res) => {
  try {
    const tagsQuery = req.query.tags;

    if (!tagsQuery) {
      return res.status(400).json({
        success: false,
        message: "Tags query is required",
      });
    }

    const tagsArray = tagsQuery.split(",").map((tag) => tag.trim());

    const courses = await Course.find({
      tag: { $in: tagsArray },
      status: "Published", // optional: filter published only
    })
      .populate("instructor", "firstName lastName")
      .populate("category", "name")
      .select("-ratingAndReviews -courseContent");

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (err) {
    console.error("Error fetching courses by tags:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};

exports.getCoursesByCategories = async (req, res) => {
  try {
    const { categories } = req.body;

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Categories are required." });
    }

    // Find category ObjectIds for the given category names
    const matchedCategories = await Category.find({
      name: { $in: categories },
    }).select("_id");

    const categoryIds = matchedCategories.map((cat) => cat._id);

    const courses = await Course.find({ category: { $in: categoryIds } })
      .populate("instructor", "firstName lastName")
      .exec();

    res.status(200).json({ success: true, data: courses });
  } catch (err) {
    console.error("Error fetching courses by categories", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch courses." });
  }
};
