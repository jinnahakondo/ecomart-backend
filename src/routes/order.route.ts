import { Router } from "express";
import * as orderController from "../controllers/order.controller";

const router = Router();

// get order route
router.get("/", orderController.getOrder);

//get a single order route
router.get("/:id", orderController.getSingleOrder);

//get order for a user route
router.get("/user/:userId", orderController.getOrderForAUser);

// create order r/oute
router.post("/", orderController.createOrder);

// update order route
router.patch("/:id", orderController.updateOrder);

//order delete route
router.delete("/:id", orderController.deleteOrder);

export default router;
