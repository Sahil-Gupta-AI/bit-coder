import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: false,
      trim: true
    },
    clientCompany: {
      type: String,
      default: "",
      trim: true
    },
    projectName: {
      type: String,
      required: false,
      trim: true
    },
    proposalDate: {
      type: String,
      required: false
    },
    projectScope: {
      type: String,
      required: false
    },
    deliverables: {
      type: [String],
      required: false
    },
    timeline: {
      type: String,
      required: false
    },
    budget: {
      type: String,
      required: false
    },
    terms: {
      type: String,
      required: false
    },
    templateId: {
      type: String,
      required: false
    },
    themeId: {
      type: String,
      required: false
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    pdfUrl: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Proposal", proposalSchema);
