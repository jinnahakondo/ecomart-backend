import { Router } from "express";
import * as authController from "../../controllers/auth/auth.controller";
const router = Router();

// create user
router.post("/register", authController.createUser);

// login user
router.post("/login", authController.loginUser);

//getAuthenticated user info
router.get("/me", authController.getAuthenticateUserInfo);

// logout user
router.post("/logout", authController.logOutUser);

export default router;
