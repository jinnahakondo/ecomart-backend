import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import ProductModel from "../models/ProductModel";
import OrderModel from "../models/OrderModel";
export const getStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await UserModel.countDocuments();
    const totalProducts = await ProductModel.countDocuments();
    const totalOrders = await OrderModel.countDocuments();
    res.status(200).json({
      totalUsers,
      totalProducts,
      totalOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to get dashboard stats",
      error,
    });
  }
};
