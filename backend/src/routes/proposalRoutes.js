import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { generateProposal, getUserProposals } from "../controllers/proposalController.js";

const router = express.Router();

router.use(protect);

router.post("/generate", generateProposal);
router.get("/", getUserProposals);

export default router;
