import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";
import { sendSuccess, sendError, calculatePagination } from "../utils/responseHandler";

// get all orders with pagination
export const getOrder = async (req: Request, res: Response) => {
  try {
    const skip = Number(req.query.skip as string) || 0;
    const limit = Number(req.query.limit as string) || 20;

    const totalOrders = await OrderModel.countDocuments();
    const orders = await OrderModel.find()
      .populate("productId", "title thumbnail")
      .skip(skip)
      .limit(limit);

    const pagination = calculatePagination(totalOrders, skip, limit);

    return sendSuccess(res, "Orders retrieved successfully", orders, 200, pagination);
  } catch (error: any) {
    return sendError(res, "Failed to retrieve orders", 500);
  }
};

// get single order by ID
export const getSingleOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await OrderModel.findById(id);
    if (!order) {
      return sendError(res, "Order not found", 404);
    }

    return sendSuccess(res, "Order retrieved successfully", order, 200);
  } catch (error: any) {
    return sendError(res, "Failed to retrieve order", 500);
  }
};

// get orders for a specific user with pagination
export const getOrderForAUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const skip = Number(req.query.skip as string) || 0;
    const limit = Number(req.query.limit as string) || 20;

    const totalOrders = await OrderModel.countDocuments({ userId });
    const orders = await OrderModel.find({ userId })
      .populate("productId", "title thumbnail")
      .skip(skip)
      .limit(limit);

    if (!orders || orders.length === 0) {
      return sendError(res, "No orders found for this user", 404);
    }

    const pagination = calculatePagination(totalOrders, skip, limit);

    return sendSuccess(res, "User orders retrieved successfully", orders, 200, pagination);
  } catch (error: any) {
    return sendError(res, "Failed to retrieve user orders", 500);
  }
};

// create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const newOrder = { ...body, tracking: [{ status: "pending" }] }
    const result = await OrderModel.create(newOrder);
    return sendSuccess(res, "Order created successfully", result, 201);
  } catch (error: any) {
    return sendError(res, "Failed to create order", 500);
  }
};

// update an order
export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await OrderModel.updateOne({ _id: id }, {
      status, $push: { tracking: { status } }
    });
    return sendSuccess(res, "Order updated successfully", result, 200);
  } catch (error: any) {
    return sendError(res, "Failed to update order", 500);
  }
};

// delete an order
export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await OrderModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return sendError(res, "Order not found", 404);
    }

    return sendSuccess(res, "Order deleted successfully", result, 200);
  } catch (error: any) {
    return sendError(res, "Failed to delete order", 500);
  }
};
