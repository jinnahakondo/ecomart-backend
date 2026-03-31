import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import ProductModel from "../models/ProductModel";
import OrderModel from "../models/OrderModel";

export const getStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await UserModel.countDocuments();
    const totalProducts = await ProductModel.countDocuments();
    const totalOrders = await OrderModel.countDocuments();

    const revenueResult = await OrderModel.aggregate([
      { $match: { status: "confirmed" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    res.status(200).json({
      success: true,
      message: "Dashboard stats retrieved successfully",
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get dashboard stats",
      error: error?.message || error,
    });
  }
};