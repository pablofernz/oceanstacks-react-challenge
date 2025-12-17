import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { router as apiRouter } from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use("/api", apiRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
