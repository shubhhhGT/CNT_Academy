const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    const { title, summary, content, thumbnail } = req.body;
    const author = req.user.id;

    if (!title || !summary || !content || !thumbnail) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const blog = await Blog.create({
      title,
      summary,
      content,
      thumbnail,
      author,
    });
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error creating blog" });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("author", "firstName lastName");
    res.status(200).json({ success: true, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id, title, summary, content, thumbnail } = req.body;

    // Optional: Validate inputs here
    if (!id || !title || !summary || !content || !thumbnail) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, summary, content, thumbnail },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (err) {
    console.error("UPDATE_BLOG ERROR:", err);
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched blog successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
