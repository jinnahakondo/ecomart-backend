import { Request, Response } from "express";
import ReviewModel from "../models/ReviewModel";
import { sendSuccess, sendError, calculatePagination } from "../utils/responseHandler";

// get reviews by productId with pagination and search
export const getReviews = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const skip = Number(req.query.skip as string) || 0;
    const limit = Number(req.query.limit as string) || 20;
    const searchText = req.query.search as string;

    const query: any = { productId };
    if (searchText) {
      const regex = { $regex: searchText, $options: "i" };
      query.$or = [
        { reviewerName: regex },
        { email: regex },
        { comment: regex },
      ];
    }

    const totalReviews = await ReviewModel.countDocuments(query);
    const reviews = await ReviewModel.find(query).skip(skip).limit(limit);

    if (!reviews || reviews.length === 0) {
      return sendError(res, "Reviews not found", 404);
    }

    const pagination = calculatePagination(totalReviews, skip, limit);

    return sendSuccess(res, "Reviews fetched successfully", reviews, 200, pagination);
  } catch (error: any) {
    return sendError(res, "Failed to get reviews", 500);
  }
};

// get reviews by userId for a user with pagination and search
export const getMyReviews = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const skip = Number(req.query.skip as string) || 0;
    const limit = Number(req.query.limit as string) || 20;
    const searchText = req.query.search as string;

    const query: any = { userId };
    if (searchText) {
      const regex = { $regex: searchText, $options: "i" };
      query.$or = [
        { reviewerName: regex },
        { email: regex },
        { comment: regex },
      ];
    }

    const totalReviews = await ReviewModel.countDocuments(query);
    const reviews = await ReviewModel.find(query).skip(skip).limit(limit);

    if (!reviews || reviews.length === 0) {
      return sendError(res, "Reviews not found", 404);
    }

    const pagination = calculatePagination(totalReviews, skip, limit);

    return sendSuccess(res, "Reviews fetched successfully", reviews, 200, pagination);
  } catch (error: any) {
    return sendError(res, "Failed to get reviews", 500);
  }
};


// create a new review
export const createReview = async (req: Request, res: Response) => {

  try {
    const newReview = req.body;
    const result = await ReviewModel.create(newReview);
    return sendSuccess(res, "Review created successfully", result, 201);
  } catch (error: any) {
    return sendError(res, "Failed to create review", 500);
  }
};

// delete review by ID
export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await ReviewModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return sendError(res, "Review not found", 404);
    }

    return sendSuccess(res, "Review deleted successfully", result, 200);
  } catch (error: any) {
    return sendError(res, "Failed to delete review", 500);
  }
};
