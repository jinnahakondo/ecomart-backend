import { Request, Response } from "express";
import ProductModel from "../models/ProductModel";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await ProductModel.distinct("category");
    res.status(200).json({
      message: "all category retrive successfully",
      categories,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "failed to retrive categories",
      err: error.message,
    });
  }
};
