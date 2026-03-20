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
    res.status(200).json({
      statusData,
    });
  } catch (error) {
    res.status(500).json(
        {
        message:"failed to get chart data",
        statusData
    }
    )
  }
};
