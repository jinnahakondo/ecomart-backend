import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";
export const getChartData = async (req: Request, res: Response) => {
  try {
    // Order Status distribution (Pie Chart)
    const statusData = await OrderModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Monthly Revenue (Bar Chart)
    const monthlyRevenue = await OrderModel.aggregate([
      { $match: { status: "confirmed" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalPrice" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    //Daily Revenue (Line Chart)
    const dailyRevenue = await OrderModel.aggregate([
      { $match: { status: "confirmed" } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          revenue: { $sum: "$totalPrice" },
          orders: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      statusData,
      monthlyRevenue,
      dailyRevenue,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "failed to get chart data",
      error: error.message,
    });
  }
};
