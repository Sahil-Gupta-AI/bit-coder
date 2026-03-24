
import Template from "../models/Template.js";

const uploadTemplate = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Company name is required"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Letterhead file is required"
      });
    }

    const template = await Template.create({
      companyName,
      fileUrl: `/uploads/${req.file.filename}`,
      fileType: req.file.mimetype
    });

    return res.status(201).json({
      success: true,
      message: "Template uploaded successfully",
      data: template
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Template upload failed",
      error: error.message
    });
  }
};

const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: templates
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch templates",
      error: error.message
    });
  }
};

export { uploadTemplate, getTemplates };