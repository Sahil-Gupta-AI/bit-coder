import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: false,
      trim: true
    },
    quantity: {
      type: Number,
      required: false,
      default: 1,
      min: 0
    },
    price: {
      type: Number,
      required: false,
      default: 0,
      min: 0
    },
    total: {
      type: Number,
      required: false,
      default: 0,
      min: 0
    }
  },
  { _id: false }
);

const quotationSchema = new mongoose.Schema(
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
    quotationDate: {
      type: String,
      required: false
    },
    validityDate: {
      type: String,
      required: false
    },
    items: {
      type: [itemSchema],
      required: false
    },
    subtotal: {
      type: Number,
      required: true
    },
    taxPercent: {
      type: Number,
      default: 0
    },
    taxAmount: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
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

export default mongoose.model("Quotation", quotationSchema);