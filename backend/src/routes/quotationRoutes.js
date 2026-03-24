import express from "express";
import { generateQuotation, getQuotations } from "../controllers/quotationController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/generate", protect, generateQuotation);
router.get("/", protect, getQuotations);

export default router;