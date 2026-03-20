import { Request, Response } from "express";
import ReviewModel from "../models/ReviewModel";


// get review with email controller
export const getReviews= async(req:Request,res:Response)=>{
    const email= req.params.email;
    try {
        const reviews = await ReviewModel.find({email:email});
        if(reviews){
            res.status(200).json({
                reviews
            });
        }
            else{
                res.status(404).json({
                    success: false,
                    message: 'reviews not found',
                })
            }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get reviews',
        });

    }
}

// create review controller
export const createReview= async(req:Request,res:Response)=>{
       try {
        const newReview = req.body;
     const result= await ReviewModel.create(newReview);
        res.status(201).json({
            success: true,
            message: 'Review created successfully',
            result: result,
        }); 
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to create review',
            error: error.message,
        }); 
    }
}

// delete review controller
export const deleteReview= async(req:Request,res:Response)=>{
    try {
        const {id}= req.params;
        const result = await ReviewModel.deleteOne({_id:id}); 
        res.status(200).json({
            success: true,
            message: 'review deleted successfully',
            result: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete review',
            error: error.message,
        });
    }
};



