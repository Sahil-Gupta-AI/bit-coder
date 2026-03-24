import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    fileUrl: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      required: true
    },
    cloudinaryId: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Template", templateSchema);