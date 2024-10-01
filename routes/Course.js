const express = require("express");
const router = express.Router();

// Importing course controllers
const {
  createCourse,
  editCourse,
  showAllCourses,
  getCourseDetails,
  getFUllCourseDetails,
  getInstructorCourses,
  deleteCourse,
  addBookmark,
  removeBookmark,
  getAllBookmarks,
} = require("../controllers/Course");

// Importimg categories controller
const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controllers/Categories");

// Importimg Section controllers
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// Importimg Sub-Section controllers
const {
  createSubsection,
  updateSubSection,
  deleteSubsection,
} = require("../controllers/SubSection");

// Importing rating controllers
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReviews");

const { updateCourseProgress } = require("../controllers/CourseProgress");
// Middlewares
const { auth, isUser, isAdmin } = require("../middlewares/auth");

// ******************************* Course routes  *******************************
// Course can be created only by instructor
router.post("/createCourse", auth, isAdmin, createCourse);
// Add a section to the course
router.post("/addSection", auth, isAdmin, createSection);
// update section
router.post("/updateSection", auth, isAdmin, updateSection);
// delete section
router.post("/deleteSection", auth, isAdmin, deleteSection);
// Add a subsection to the course
router.post("/addSubSection", auth, isAdmin, createSubsection);
// update subsection
router.post("/updateSubSection", auth, isAdmin, updateSubSection);
// delete subsection
router.post("/deleteSubSection", auth, isAdmin, deleteSubsection);
// get all courses
router.get("/showAllCourses", showAllCourses);
// Get details for a specific course
router.post("/getCourseDetails", getCourseDetails);
// Get all course details
router.post("/getFullCourseDetails", auth, getFUllCourseDetails);
// edit course
router.post("/editCourse", auth, isAdmin, editCourse);
// Get all courses for a specific instuctor
router.get("/getInstructorCourses", auth, isAdmin, getInstructorCourses);
// delete course
router.delete("/deleteCourse", deleteCourse);

router.post("/updateCourseProgress", auth, isUser, updateCourseProgress);

// ******************************* Category routes (Only by Admin) *******************************
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ******************************* Rating and Review *******************************
router.post("/createRating", auth, isUser, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

// ******************************* Bookmarks *******************************
router.post("/addBookmark", auth, isUser, addBookmark);
router.post("/removeBookmark", auth, isUser, removeBookmark);
router.get("/getAllBookmarks", auth, isUser, getAllBookmarks);

module.exports = router;
