import { Request, Response } from "express";
import ProductModel from "../models/ProductModel";
import { sendSuccess, sendError, calculatePagination } from "../utils/responseHandler";

// get all products with optional filters, search, pagination, sorting
export const getProduct = async (req: Request, res: Response) => {
  const skip = Number(req.query.skip as string) || 0;
  const limit = Number(req.query.limit as string) || 20;
  const searchText = req.query.search as string;
  const sort = req.query.sort as string;
  const category = req.query.category as string;

  const query: any = {};

  if (searchText) {
    const regex = { $regex: searchText, $options: "i" };
    query.$or = [
      { title: regex },
      { description: regex },
      { category: regex },
      { brand: regex },
      { tags: regex },
    ];
  }

  if (category) query.category = { $regex: category, $options: "i" };

  let sortOption: any = {};
  if (sort === "asc") sortOption.rating = 1;
  if (sort === "dsc") sortOption.rating = -1;

  try {
    const totalProducts = await ProductModel.countDocuments(query);
    let mongoQuery = ProductModel.find(query);

    if (sort) mongoQuery = mongoQuery.sort(sortOption);

    const products = await mongoQuery.skip(skip).limit(limit);

    const pagination = calculatePagination(totalProducts, skip, limit);

    return sendSuccess(res, "Products retrieved successfully", products, 200, pagination);
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
    const data = req.body;

    const oldPrice = Number(data.oldPrice);
    const price = Number(data.price);

    let discountPercentage = 0;

    if (oldPrice > 0 && price >= 0 && oldPrice >= price) {
      const discount = oldPrice - price;
      discountPercentage = (discount / oldPrice) * 100;
    }

    const newProduct = {
      ...data,
      discountPercentage: Number(discountPercentage.toFixed(2)),
    };

    const result = await ProductModel.create(newProduct);

    return sendSuccess(res, "Product created successfully", result, 201);
  } catch (error: any) {
    return sendError(res, `${error.message} | Failed to create product`, 500);
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