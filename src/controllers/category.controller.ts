import { Request, Response } from "express";
import ProductModel from "../models/ProductModel";
import { sendSuccess, sendError } from "../utils/responseHandler";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await ProductModel.distinct("category");

    return sendSuccess(res, "Categories retrieved successfully", categories || [], 200);
  } catch (error: any) {
    return sendError(res, "Failed to retrieve categories", 500);
  }
};