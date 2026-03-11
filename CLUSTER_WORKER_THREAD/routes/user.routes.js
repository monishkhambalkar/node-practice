import express from "express";
import { processImage, processOrder } from "../controllers/process.controller.js";

const router = express.Router();

router.post("/process-image", processImage);

router.post("/process-order", processOrder);

export default router;