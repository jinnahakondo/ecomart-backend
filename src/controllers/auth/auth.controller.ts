import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendSuccess, sendError } from "../../utils/responseHandler";

const jwtSecret: string = process.env.JWT_SECRECT!;

// Create new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const result = await UserModel.create(newUser);
    const data = {
      _id: result._id,
      name: result.name,
      email: result.email,
      avatar: result.avatar,
      role: result.role,
    };
    return sendSuccess(res, "User created successfully", data, 201);
  } catch (error: any) {
    return sendError(res, "Failed to create user", 500);
  }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Invalid email address");

    const isPasswordOk = await bcrypt.compare(password, user.password);
    if (!isPasswordOk) throw new Error("Invalid password");

    const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return sendSuccess(
      res,
      "Login successful",
      { name: user.name, avatar: user.avatar, role: user.role },
      200,
    );
  } catch (error: any) {
    return sendError(res, error?.message || "Login failed", 500);
  }
};

// Get authenticated user info
export const getAuthenticateUserInfo = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) return sendError(res, "No token provided", 401);

    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;

    if (!decodedToken?._id) return sendError(res, "Unauthorized access", 401);

    const user = await UserModel.findById(decodedToken._id).select("-password");
    if (!user) throw new Error("User not found");

    return sendSuccess(res, "User info fetched successfully", user, 200);
  } catch (error: any) {
    return sendError(res, "Failed to fetch user info", 500);
  }
};

// Logout user
export const logOutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return sendSuccess(res, "User logged out successfully", {}, 200);
  } catch (error: any) {
    return sendError(res, "Failed to log out user", 500);
  }
};
