import { Request, Response } from "express";
import ProductModel from "../models/ProductModel"

// get product controller
export const getProduct = async(req:Request,res:Response) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json({
            success: true,
            message: 'Products retrieved successfully',
            result: products,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving products',
            result: null,
        })
    }
}