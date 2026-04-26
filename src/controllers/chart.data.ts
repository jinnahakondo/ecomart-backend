import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";
import { sendSuccess, sendError } from "../utils/responseHandler";

export const getChartData = async (req: Request, res: Response) => {
  try {
    // Pie Chart: Order Status Distribution
    const statusData = await OrderModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Bar Chart: Monthly Revenue
    const monthlyRevenue = await OrderModel.aggregate([
      { $match: { status: "delivered" } },
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          revenue: { $sum: "$totalPrice" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Line Chart: Daily Revenue
    const dailyRevenue = await OrderModel.aggregate([
      { $match: { status: "delivered" } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          revenue: { $sum: "$totalPrice" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return sendSuccess(res, "Chart data retrieved successfully", {
      statusData: statusData || [],
      monthlyRevenue: monthlyRevenue || [],
      dailyRevenue: dailyRevenue || [],
    }, 200);
  } catch (error: any) {
    return sendError(res, "Failed to get chart data", 500);
  }
};