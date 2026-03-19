import { Router } from "express";
import *as userController from '../controllers/user.controller';

const router = Router();

// get users route
router.get('/',userController.getUser); 

//get a single user route
router.get('/:id', userController.getSingleUser);

// create users route
router.post('/',userController.createUser); 

// update users route
router.patch('/:id',userController.updateUser);

//user delete route
router.delete('/:id',userController.deleteUser);

export default router;