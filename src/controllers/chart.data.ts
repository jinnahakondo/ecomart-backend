import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";

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
      { $match: { status: "confirmed" } },
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
      { $match: { status: "confirmed" } },
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

    res.status(200).json({
      success: true,
      message: "Chart data retrieved successfully",
      data: {
        statusData: statusData || [],
        monthlyRevenue: monthlyRevenue || [],
        dailyRevenue: dailyRevenue || [],
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get chart data",
      error: error?.message || error,
    });
  }
};