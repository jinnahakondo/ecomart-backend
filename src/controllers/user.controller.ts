import { Request, Response } from "express";

// get user controller
export const getUser=async(req:Request, res:Response)=>{
    try {
        res.status(201).json({
            success: true,
            message: 'User got successfully',
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
        res.status(201).json({
            success: true,
            message: 'User created successfully',
        }); 
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
            error: error.message,
        }); 
    }
}

