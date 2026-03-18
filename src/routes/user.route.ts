import { Router } from "express";
import *as userController from '../controllers/user.controller';

const router = Router();

// get users route
router.get('/user',userController.getUser); 

// create users route
router.post('/user',userController.createUser); 

// update users route
router.patch('/user/:id',userController.updateUser);

export default router;