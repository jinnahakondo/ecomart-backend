import { Request, Response } from "express";
import ProductModel from "../models/ProductModel";

// get all products with optional filters, pagination, sorting
export const getProduct = async (req: Request, res: Response) => {
  const skip = Number(req.query.skip as string) || 0;
  const limit = Number(req.query.limit as string) || 30;
  const searchText = req.query.search as string;
  const sort = req.query.sort as string;
  const category = req.query.category as string;

  const query: any = {};

  if (searchText) query.title = { $regex: searchText, $options: "i" };
  if (category) query.category = { $regex: category, $options: "i" };

  let sortOption: any = {};
  if (sort === "asc") sortOption.rating = 1;
  if (sort === "dsc") sortOption.rating = -1;

  try {
    let mongoQuery = ProductModel.find(query);

    if (sort) mongoQuery = mongoQuery.sort(sortOption);

    const products = await mongoQuery.skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      result: products,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error retrieving products",
      error: error.message,
    });
  }
};

// get single product by ID
export const getSingleProduct = async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  try {
    const product = await ProductModel.findById(serviceId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      result: product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

// create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = req.body;
    const result = await ProductModel.create(newProduct);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// update a product
export const updateProduct = async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const updateData = req.body;
  try {
    const result = await ProductModel.updateOne({ _id: serviceId }, updateData);
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// delete a product
export const deleteAProduct = async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  try {
    const result = await ProductModel.deleteOne({ _id: serviceId });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};