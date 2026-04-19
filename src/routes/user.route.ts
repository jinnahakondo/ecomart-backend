import { Router } from "express";
import * as userController from "../controllers/user.controller";


const router = Router();



// get users
router.get("/", userController.getUser);

//get a single user
router.get("/email/:email", userController.getSingleUserWithEmail);
router.get("/:id", userController.getSingleUser);

// update users
router.patch("/:id", userController.updateUser);

//user delete
router.delete("/:id", userController.deleteUser);

export default router;
