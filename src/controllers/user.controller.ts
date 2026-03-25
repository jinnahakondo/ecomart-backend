import { Request, Response } from "express";
import UserModel from "../models/UserModel";

// get user
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.find();
    res.status(201).json({
      success: true,
      message: "User got successfully",
      result: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get user",
      error: error.message,
    });
  }
};

// get single user
export const getSingleUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findOne({ _id: id });
    if (user) {
      res.status(200).json({
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get user",
    });
  }
};
// get single user with email
export const getSingleUserWithEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get user",
    });
  }
};

// create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const result = await UserModel.create(newUser);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      result: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
};

// update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;
    const result = await UserModel.updateOne({ _id: id }, updatedUser);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      result: result,
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
  try {
    const { id } = req.params;
    const result = await UserModel.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      result: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};
