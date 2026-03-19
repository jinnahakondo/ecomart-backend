import { Router } from "express";
import *as productController from '../controllers/product.controller';

const router = Router();

// get products route
router.get('/',productController.getProduct);

export default router;