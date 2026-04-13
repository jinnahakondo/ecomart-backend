import { Router } from "express";
import * as orderController from "../controllers/order.controller";

const router = Router();

// get all orders
router.get("/", orderController.getOrder);

// get order for a user (specific first)
router.get("/user/:userId", orderController.getOrderForAUser);

// get single order
router.get("/:id", orderController.getSingleOrder);

// create order
router.post("/", orderController.createOrder);

// update order
router.patch("/:id", orderController.updateOrder);

// delete order
router.delete("/:id", orderController.deleteOrder);

export default router;