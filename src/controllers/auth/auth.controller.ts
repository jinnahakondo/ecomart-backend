import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

const jwtSecret: string = process.env.JWT_SECRECT!;

// Create new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const result = await UserModel.create(newUser);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
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

    res
      .status(200)
      .json({
        success: true,
        user: { name: user.name, avatar: user.avatar, role: user.role },
      });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

// Get authenticated user info
export const getAuthenticateUserInfo = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });

    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;

    if (!decodedToken?._id)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });

    const user = await UserModel.findById(decodedToken._id).select("-password");
    if (!user) throw new Error("User not found");

    res.status(200).json({ success: true, user });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user info",
      error: error?.message,
    });
  }
};

// Logout user
export const logOutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to log out user",
      error: error?.message,
    });
  }
};
