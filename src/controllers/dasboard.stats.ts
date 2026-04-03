import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import ProductModel from "../models/ProductModel";
import OrderModel from "../models/OrderModel";
import { sendSuccess, sendError } from "../utils/responseHandler";

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

    return sendSuccess(res, "Dashboard stats retrieved successfully", {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
    }, 200);
  } catch (error: any) {
    return sendError(res, "Failed to get dashboard stats", 500);
  }
};