import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

    const token = jwt.sign(JSON.stringify(user._id), jwtSecrect);

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
