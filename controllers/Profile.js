// Since we have already created a fake profile during signup we just need tpo update it now
const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const Testimonial = require("../models/Testimonial");
const RatingAndReview = require("../models/RatingAndReview");
const NewsletterSubscriber = require("../models/Newsletter");
const ArchivedUser = require("../models/ArchivedUser");
const { uploadFile } = require("../utils/uploadToS3");
const convertSecondsToDuration = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");

exports.updateProfile = async (req, res) => {
  try {
    // Get data
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body;

    // get user ID
    const id = req.user.id;

    // FInd profile
    const userDetails = await User.findById(id);
    const userProfile = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(userProfile);

    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
    });
    await user.save();

    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.gender = gender;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();

    // FInd the updated user details
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    // Send response
    return res.status(200).json({
      success: true,
      message: "user profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete account
exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    const { reason } = req.body;

    if (!reason) {
      return res.status(500).json({
        success: false,
        message: "Please enter the reason to delete the account",
      });
    }

    // Validate user exists
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get user email before deletion for newsletter cleanup
    const userEmail = userDetails.email;

    // Create archived user record
    const archivedUser = new ArchivedUser({
      originalId: userDetails._id,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      accountType: userDetails.accountType,
      courses: userDetails.courses,
      image: userDetails.image,
      reason: reason,
    });
    await archivedUser.save();

    // Delete profile
    await Profile.findByIdAndDelete(userDetails.additionalDetails);

    // Unenroll user from all courses
    for (const courseId of userDetails.courses) {
      await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentsEnrolled: id } },
        { new: true }
      );
    }

    // Delete user testimonials
    await Testimonial.deleteMany({ user: id });

    // Delete user ratings and reviews
    await RatingAndReview.deleteMany({ user: id });

    // Unsubscribe from newsletter
    await NewsletterSubscriber.findOneAndDelete({ email: userEmail });

    // Finally delete user
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User account and all associated data deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete account. Please try again.",
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Get ID
    const id = req.user.id;
    // validation and user details
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .populate("orderHistory")
      .exec();
    // return  res
    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while getting profile details, please try again",
    });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    // get userID
    const userId = req.user.id;
    const image = req.body.profilePicture;

    // Update prfile pic of user
    const updatedPicture = await User.findByIdAndUpdate(
      { _id: userId },
      { image },
      { new: true }
    );

    // Return response
    return res.status(200).json({
      success: true,
      message: "Profile pic updated successfully",
      data: updatedPicture,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "cannot update profile pic, please try again",
      error: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: { path: "courseContent", populate: { path: "subSection" } },
      })
      .exec();

    userDetails = userDetails.toObject();

    var subSecLength = 0;
    for (var i = 0; i < userDetails.courses.length; i++) {
      subSecLength = 0;
      let totalDurationinSeconds = 0;
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationinSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );
        // Calculate total duration for each course
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationinSeconds
        );
        // calculate sub section length
        subSecLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }

      // calculate progress for each course
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i],
        userId: userId,
      });

      courseProgressCount = courseProgressCount?.completedVideos.length;

      if (subSecLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        const mul = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round((courseProgressCount / subSecLength) * 100 * mul) / mul;
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
      // data: coursesWithTotalDuration,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const user = req.user.id;
    const courseDetails = await Course.find({ instructor: user });

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEntrolled.length;
      const totalAmountGenerated = course.price * totalStudentsEnrolled;

      // create a new object with the required data
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDesc: course.courseDescription,
        totalStudents: totalStudentsEnrolled,
        totalAmount: totalAmountGenerated,
      };
      return courseDataWithStats;
    });

    return res.status(200).json({
      success: true,
      courses: courseData,
      message: "Instructor details fetched successfully",
    });
  } catch (error) {
    console.log("Error occured while getting instructor info", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
