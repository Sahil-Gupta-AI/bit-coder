import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadLetterhead, uploadQuotationPdf, uploadProposalPdf } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/letterhead", upload.single("file"), uploadLetterhead);
router.post("/quotation-pdf", upload.single("file"), uploadQuotationPdf);
router.post("/proposal-pdf", upload.single("file"), uploadProposalPdf);

export default router;