import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadTemplate, getTemplates } from "../controllers/templateController.js";

const router = express.Router();

router.post("/upload", upload.single("letterhead"), uploadTemplate);
router.get("/", getTemplates);

export default router;