import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
const jwtSecrect: string = process.env.JWT_SECRECT!;

//create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const result = await UserModel.create(newUser);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      result: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
};

//login user
export const loginUser = async (req: Request, res: Response) => {
  const payload = req.body;

  try {
    const user = await UserModel.findOne({ email: payload.email });
    if (!user) {
      throw new Error("invalid email address");
    }

    //check password
    const isPasswordOk = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordOk) {
      throw new Error("invalid passwod");
    }

    const token = jwt.sign(JSON.stringify({ _id: user._id }), jwtSecrect);

    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error: any) {
    res.status(500).send({ message: error?.message });
  }
};

//get verifyed user info
export const getAuthenticateUserInfo = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  const decodedToken = jwt.verify(token, jwtSecrect!) as JwtPayload;

  if (!decodedToken?._id) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  const id = decodedToken._id;

  try {
    const user = await UserModel.findOne({ _id: id }).select("-password");
    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user info",
    });
  }
};

//logout user
export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
