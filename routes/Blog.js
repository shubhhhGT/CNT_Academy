const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middlewares/auth");
const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getBlogById,
} = require("../controllers/Blog");

router.post("/create", auth, isAdmin, createBlog);
router.get("/all", getAllBlogs);
router.put("/update", auth, isAdmin, updateBlog);
router.delete("/delete", auth, isAdmin, deleteBlog);
router.get("/:id", getBlogById);

module.exports = router;
