import { Request, Response } from "express";
import ProductModel from "../models/ProductModel";

// get product controller
export const getProduct = async (req: Request, res: Response) => {
  const skip = Number(req.query.skip as string) || 10;
  const limit = Number(req.query.limit as string) || 10;
  const searchText = req.query.search as string;

  // query filter
  const query = searchText
    ? {
        title: {
          $regex: searchText,
          $options: "i",
        },
      }
    : {};

  try {
    const products = await ProductModel.find(query).limit(limit).skip(skip);

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      result: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving products",
      result: null,
    });
  }
};

// get single product controller
export const getSingleProduct = async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  try {
    const product = await ProductModel.findOne({ _id: serviceId });
    if (product) {
      res.status(200).json({
        product,
      });
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {}
};

// create product controller
export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = req.body;
    const result = await ProductModel.create(newProduct);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      result: result,
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
  const update = req.body;
  try {
    const result = await ProductModel.updateOne({ _id: serviceId }, update);
    res.status(201).json({
      success: true,
      message: "product updated successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

//delete a product
export const deleteAProduct = async (req: Request, res: Response) => {
  try {
    const { serviceId } = req.params;
    const result = await ProductModel.deleteOne({ _id: serviceId });
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
      result: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};
