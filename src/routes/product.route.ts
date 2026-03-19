import { Router } from "express";
import *as productController from '../controllers/product.controller';

const router = Router();

// get products route
router.get('/',productController.getProduct);

//get a single product route
router.get('/:serviceId',productController.getSingleProduct);

// create product route
router.post('/',productController.createProduct);

// update product route
router.patch('/:serviceId',productController.updateProduct)

// delete product route
router.delete('/:serviceId',productController.deleteAProduct)

export default router;