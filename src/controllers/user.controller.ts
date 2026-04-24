import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { sendSuccess, sendError, calculatePagination } from "../utils/responseHandler";

// get all users with pagination and search
export const getUser = async (req: Request, res: Response) => {
  try {
    const skip = Number(req.query.skip as string) || 0;
    const limit = Number(req.query.limit as string) || 20;
    const searchText = req.query.search as string;

    const query: any = {};
    if (searchText) {
      const regex = { $regex: searchText, $options: "i" };
      query.$or = [
        { name: regex },
        { email: regex },
        { city: regex },
        { district: regex },
        { designation: regex },
      ];
    }

    const totalUsers = await UserModel.countDocuments(query);
    const users = await UserModel.find(query).skip(skip).limit(limit);

    const pagination = calculatePagination(totalUsers, skip, limit);

    return sendSuccess(res, "Users fetched successfully", users, 200, pagination);
  } catch (error: any) {
    return sendError(res, "Failed to fetch users", 500);
  }
};

// get single user by ID
export const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return sendError(res, "User not found", 404);
    }

    return sendSuccess(res, "User fetched successfully", user, 200);
  } catch (error: any) {
    return sendError(res, "Failed to fetch user", 500);
  }
};

// get single user by email
export const getSingleUserWithEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return sendError(res, "User not found", 404);
    }

    return sendSuccess(res, "User fetched successfully", user, 200);
  } catch (error: any) {
    return sendError(res, "Failed to fetch user", 500);
  }
};

// update user
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const result = await UserModel.updateOne({ _id: id }, updatedData);
    return sendSuccess(res, "User updated successfully", result, 200);
  } catch (error: any) {
    return sendError(res, "Failed to update user", 500);
  }
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await UserModel.deleteOne({ _id: id });
    return sendSuccess(res, "User deleted successfully", result, 200);
  } catch (error: any) {
    return sendError(res, "Failed to delete user", 500);
  }
};