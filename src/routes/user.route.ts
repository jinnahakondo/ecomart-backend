import { Router } from "express";
import *as userController from '../controllers/user.controller';

const router = Router();

// get users route
router.get('/user',userController.getUser); 

// create users route
router.post('/user',userController.createUser); 

export default router;