import { Request, Response } from "express";
import ProductModel from "../models/ProductModel";
import { sendSuccess, sendError } from "../utils/responseHandler";

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
    let mongoQuery = ProductModel.find(query)

    if (sort) mongoQuery = mongoQuery.sort(sortOption);

    const products = await mongoQuery.skip(skip).limit(limit);

    return sendSuccess(res, "Products retrieved successfully", products, 200);
  } catch (error: any) {

    console.log(error.message);
    return sendError(res, "Error retrieving products", 500);
  }
};

// get single product by ID
export const getSingleProduct = async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  try {
    const product = await ProductModel.findById(serviceId);
    if (!product) {
      return sendError(res, "Product not found", 404);
    }

    return sendSuccess(res, "Product fetched successfully", product, 200);
  } catch (error: any) {
    return sendError(res, "Failed to fetch product", 500);
  }
};

// create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = req.body;
    const result = await ProductModel.create(newProduct);
    return sendSuccess(res, "Product created successfully", result, 201);
  } catch (error: any) {
    return sendError(res, "Failed to create product", 500);
  }
};

// update a product
export const updateProduct = async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const updateData = req.body;
  try {
    const result = await ProductModel.updateOne({ _id: serviceId }, updateData);
    return sendSuccess(res, "Product updated successfully", result, 200);
  } catch (error: any) {
    return sendError(res, "Failed to update product", 500);
  }
};

// delete a product
export const deleteAProduct = async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  try {
    const result = await ProductModel.deleteOne({ _id: serviceId });
    if (result.deletedCount === 0) {
      return sendError(res, "Product not found", 404);
    }

    return sendSuccess(res, "Product deleted successfully", result, 200);
  } catch (error: any) {
    return sendError(res, "Failed to delete product", 500);
  }
};