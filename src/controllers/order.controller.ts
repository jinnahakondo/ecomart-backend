import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";

// get all orders
export const getOrder = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      result: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve orders",
      error: error.message,
    });
  }
};

// get single order by ID
export const getSingleOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      result: order,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve order",
      error: error.message,
    });
  }
};

// get orders for a specific user
export const getOrderForAUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const orders = await OrderModel.find({ userId });
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "User orders retrieved successfully",
      result: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user orders",
      error: error.message,
    });
  }
};

// create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = req.body;
    const result = await OrderModel.create(newOrder);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// update an order
export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const result = await OrderModel.updateOne({ _id: id }, updateData);
    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
};

// delete an order
export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await OrderModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
};