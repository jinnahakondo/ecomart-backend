import { Request, Response } from "express";
import UserModel from "../models/UserModel";

// get all users
export const getUser = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      result: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// get single user by ID
export const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      result: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

// get single user by email
export const getSingleUserWithEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      result: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

// update user
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const result = await UserModel.updateOne({ _id: id }, updatedData);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await UserModel.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};