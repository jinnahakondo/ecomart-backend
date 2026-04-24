import { GoogleGenerativeAI } from "@google/generative-ai";
import { sendError, sendSuccess } from "../../utils/responseHandler";
import { Request, Response } from "express";


const apiKey = process.env.GEMINI_API_KEY;

export const generateDescription = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;
        
        if (!title || title.trim() === "") {
            return sendError(res, "Product title is required", 400);
        }

        if (!apiKey) {
            return sendError(res, "Gemini API key missing", 500);
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview"
        });

        const prompt = `
Write a professional and SEO-friendly e-commerce product description.

Product Title: ${title}

Rules:
- Maximum 100 words
- Attractive tone
- Clear and concise
- Suitable for online store
`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return sendSuccess(
            res,
            "Description generated successfully",
            { description: text }
        );
    } catch (error) {
        console.error("Gemini Error:", error);

        return sendError(res, "Failed to generate description", 500);
    }
};