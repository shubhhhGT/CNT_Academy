const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
require("dotenv").config();

// Create subsection
exports.createSubsection = async (req, res) => {
  try {
    const { sectionId, title, description, duration, videoUrl } = req.body;

    if (!sectionId || !title || !description || !videoUrl || !duration) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const subSectionDetails = await SubSection.create({
      title,
      timeDuration: duration,
      description,
      videoUrl,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: subSectionDetails._id } },
      { new: true }
    ).populate("subSection");

    res.status(200).json({
      success: true,
      message: "Subsection created successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error("Create subsection error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating subsection",
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, description, sectionId, duration, videoUrl } =
      req.body;

    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    // Update fields if provided
    if (title !== undefined) subSection.title = title;
    if (description !== undefined) subSection.description = description;

    // If new video is provided via URL
    if (videoUrl) {
      subSection.videoUrl = videoUrl;
      subSection.timeDuration = duration || subSection.timeDuration || 6;
    }

    await subSection.save();

    // Fetch updated section with all subsections
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    return res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error("Update subsection error:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating subsection",
    });
  }
};

exports.deleteSubsection = async (req, res) => {
  try {
    // Get subsection Id to be deleted
    const { subSectionId, sectionId } = req.body;

    // delete subsection from section
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: { subSection: subSectionId },
      }
    );

    // delete the subsection
    await SubSection.findByIdAndDelete(subSectionId);

    // return updated section
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    // Return response
    return res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while deleting subsection",
    });
  }
};
