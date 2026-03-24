
import Quotation from "../models/Quotation.js";
import Template from "../models/Template.js";
import { calculateTotals } from "../services/pricingService.js";

const generateQuotation = async (req, res) => {
  try {
    const {
      clientName,
      clientCompany,
      projectName,
      quotationDate,
      validityDate,
      items,
      taxPercent,
      templateId,
      pdfUrl
    } = req.body;

    // Validation relaxed so users can test dynamically without filling out all text inputs.

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one item is required"
      });
    }

    let template = null;
    if (templateId) {
      template = await Template.findById(templateId);
      if (!template) {
        return res.status(404).json({
          success: false,
          message: "Template not found"
        });
      }
    }

    const totals = calculateTotals(items, taxPercent);

    const quotation = await Quotation.create({
      clientName,
      clientCompany,
      projectName,
      quotationDate,
      validityDate,
      items: totals.items,
      subtotal: totals.subtotal,
      taxPercent: Number(taxPercent || 0),
      taxAmount: totals.taxAmount,
      total: totals.total,
      ...(templateId && { templateId }),
      userId: req.user.userId,
      pdfUrl
    });

    return res.status(201).json({
      success: true,
      message: "Quotation generated successfully",
      data: {
        quotation,
        template
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to generate quotation",
      error: error.message
    });
  }
};

const getQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find({ userId: req.user.userId })
      .populate("templateId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: quotations
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch quotations",
      error: error.message
    });
  }
};

export { generateQuotation, getQuotations };