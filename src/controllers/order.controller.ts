import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";

// get order controller
export const getOrder = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find();
    res.status(201).json({
      success: true,
      message: "orders got successfully",
      result: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get orders",
      error: error.message,
    });
  }
};

// get single order controller
export const getSingleOrder = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const Order = await OrderModel.findOne({ _id: id });
    if (Order) {
      res.status(200).json({
        Order,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "order not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get order",
    });
  }
};

// get order for a user controller
export const getOrderForAUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  console.log(userId)
  try {
    const Order = await OrderModel.find({ userId });
    if (Order) {
      res.status(200).json({
        Order,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "order not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get order",
    });
  }
};

// create order controller
export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = req.body;
    const result = await OrderModel.create(newOrder);
    res.status(201).json({
      success: true,
      message: "order created successfully",
      result: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// update order controller
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedOrder = req.body;
    const result = await OrderModel.updateOne({ _id: id }, updatedOrder);
    res.status(200).json({
      success: true,
      message: "order updated successfully",
      result: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
};

// delete order controller
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await OrderModel.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "order deleted successfully",
      result: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
};
