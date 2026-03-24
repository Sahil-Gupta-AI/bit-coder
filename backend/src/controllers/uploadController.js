import cloudinary from "../config/cloudinaryConfig.js";

export const uploadLetterhead = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let uploadOptions = {
      folder: "letterheads",
    };

    // For PDFs, use raw resource type
    if (req.file.mimetype === "application/pdf") {
      uploadOptions.resource_type = "raw";
      uploadOptions.format = "pdf";
    }

    // Convert buffer to base64
    const fileStr = req.file.buffer.toString("base64");

    const uploadResponse = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${fileStr}`,
      uploadOptions
    );

    res.status(200).json({
      message: "Upload successful",
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
      format: uploadResponse.format
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

export const uploadQuotationPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadOptions = {
      folder: "quotations",
      resource_type: "raw",
      format: "pdf"
    };

    const fileStr = req.file.buffer.toString("base64");
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${fileStr}`,
      uploadOptions
    );

    res.status(200).json({
      message: "PDF Upload successful",
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
      format: uploadResponse.format
    });

  } catch (error) {
    console.error("PDF Upload error:", error);
    res.status(500).json({ message: "PDF Upload failed", error: error.message });
  }
};

export const uploadProposalPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadOptions = {
      folder: "proposals",
      resource_type: "raw",
      format: "pdf"
    };

    const fileStr = req.file.buffer.toString("base64");
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${fileStr}`,
      uploadOptions
    );

    res.status(200).json({
      message: "Proposal PDF Upload successful",
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
      format: uploadResponse.format
    });

  } catch (error) {
    console.error("Proposal PDF Upload error:", error);
    res.status(500).json({ message: "Proposal PDF Upload failed", error: error.message });
  }
};