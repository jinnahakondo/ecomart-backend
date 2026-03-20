import { Router } from "express";
import * as reviewController from "../controllers/review.controller";

const router = Router();

// get reviews with email route
router.get("/:email", reviewController.getReviews);

// create review route
router.post("/", reviewController.createReview);

//review delete route
router.delete("/:id", reviewController.deleteReview);

export default router;
