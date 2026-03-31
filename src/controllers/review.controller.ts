import { Request, Response } from "express";
import ReviewModel from "../models/ReviewModel";

// get reviews by email
export const getReviews = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const reviews = await ReviewModel.find({ email });
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Reviews not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      result: reviews,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get reviews",
      error: error.message,
    });
  }
};

// create a new review
export const createReview = async (req: Request, res: Response) => {
  try {
    const newReview = req.body;
    const result = await ReviewModel.create(newReview);
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create review",
      error: error.message,
    });
  }
};

// delete review by ID
export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await ReviewModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message,
    });
  }
}; 