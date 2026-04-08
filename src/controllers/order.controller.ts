import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";
import { sendSuccess, sendError } from "../utils/responseHandler";

// get all orders
export const getOrder = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find().populate(
      "productId",
      "title thumbnail",
    );
    return sendSuccess(res, "Orders retrieved successfully", orders, 200);
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

// get orders for a specific user
export const getOrderForAUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const orders = await OrderModel.find({ userId }).populate("productId", "title thumbnail")
    if (!orders || orders.length === 0) {
      return sendError(res, "No orders found for this user", 404);
    }

    return sendSuccess(res, "User orders retrieved successfully", orders, 200);
  } catch (error: any) {
    return sendError(res, "Failed to retrieve user orders", 500);
  }
};

// create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = req.body;
    const result = await OrderModel.create(newOrder);
    return sendSuccess(res, "Order created successfully", result, 201);
  } catch (error: any) {
    return sendError(res, "Failed to create order", 500);
  }
};

// update an order
export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const result = await OrderModel.updateOne({ _id: id }, updateData);
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
