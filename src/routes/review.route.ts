import { Router } from "express";
import * as reviewController from "../controllers/review.controller";

const router = Router();

// get all reviews of a user
router.get("/:productId", reviewController.getReviews);

// create review route
router.post("/", reviewController.createReview);

//review delete route
router.delete("/:id", reviewController.deleteReview);

export default router;
