import express from "express";
import { generateProposal, generateQuotation } from "../controllers/aiController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/generate-proposal", protect, generateProposal);
router.post("/generate-quotation", protect, generateQuotation);

export default router;
