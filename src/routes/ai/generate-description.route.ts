import { GoogleGenerativeAI } from "@google/generative-ai";
import { Router } from "express";
import { sendError, sendSuccess } from "../../utils/responseHandler";
import { generateDescription } from "../../controllers/Ai/generate-description.controller";

const router = Router();



router.post("/generate-description", generateDescription);

export default router;