import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import quotationRoutes from "./routes/quotationRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import proposalRoutes from "./routes/proposalRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({ message: "Quotation Generator Backend Running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/proposals", proposalRoutes);
app.use("/api/ai", aiRoutes);

export default app;