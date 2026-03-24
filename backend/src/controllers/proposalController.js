import Proposal from "../models/Proposal.js";

// Generate or Save Proposal
export const generateProposal = async (req, res) => {
  try {
    const {
      clientName,
      clientCompany,
      projectName,
      proposalDate,
      projectScope,
      deliverables,
      timeline,
      budget,
      terms,
      templateId,
      themeId,
      pdfUrl
    } = req.body;

    const proposal = await Proposal.create({
      clientName,
      clientCompany,
      projectName,
      proposalDate,
      projectScope,
      deliverables: Array.isArray(deliverables) ? deliverables : [],
      timeline,
      budget,
      terms,
      templateId,
      themeId,
      userId: req.user.userId,
      pdfUrl
    });

    res.status(201).json({
      success: true,
      message: "Proposal saved successfully",
      data: proposal
    });
  } catch (error) {
    console.error("Save proposal error:", error);
    res.status(500).json({
      success: false,
      message: "Server error saving proposal"
    });
  }
};

// Get User Proposals
export const getUserProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({ userId: req.user.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: proposals.length,
      data: proposals
    });
  } catch (error) {
    console.error("Get proposals error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching proposals"
    });
  }
};
