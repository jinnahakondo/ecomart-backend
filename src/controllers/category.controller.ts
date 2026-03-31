import { Request, Response } from "express";
import ProductModel from "../models/ProductModel";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await ProductModel.distinct("category");

    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: categories || [],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve categories",
      error: error?.message || error,
    });
  }
};