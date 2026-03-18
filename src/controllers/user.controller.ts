import { Request, Response } from "express";
import UserModel from "../models/UserModel";

// get user controller
export const getUser=async(req:Request, res:Response)=>{
    try {
        const user = await UserModel.find();
        res.status(201).json({
            success: true,
            message: 'User got successfully',
            result: user
        }); 
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to get user',
            error: error.message,
        }); 
    }
}

// create user controller
export const createUser= async(req:Request,res:Response)=>{
       try {
        const newUser = req.body;
     const result= await UserModel.create(newUser);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            result: result,
        }); 
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
            error: error.message,
        }); 
    }
}

// update user controller
export const updateUser= async(req:Request,res:Response)=>{
    try {
        const {id}= req.params; 
        const updatedUser = req.body;
        const result = await UserModel.updateOne({_id:id},updatedUser);
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            result: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to update user',
            error: error.message,
        });
    }
};

// delete user controller
export const deleteUser= async(req:Request,res:Response)=>{
    try {
        const {id}= req.params;
        const result = await UserModel.deleteOne({_id:id}); 
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            result: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: error.message,
        });
    }
};
