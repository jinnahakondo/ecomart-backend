import mongoose from "mongoose";

// reviews interface 
interface IReviews{
        rating:number;
        comment:string;
        date:Date;
        reviewerName:string;
        reviewerEmail:string;
    }

    // product meta interface
    interface IProductMeta{
    createdAt:Date,
}

// main product interface
interface IProduct{
    title:string,
    description:string,
    category:string,
    price:number,
    discountPercentage:number,
    rating?:number,
    stock:number,
    tags?:string[],
    brand:string,
    weight?:number,
    warrantyInformation?:string,
    shippingInformation?:string,
    availabilityStatus?:string,
    reviews?:IReviews[],
    returnPolicy?:string,
    meta?:IProductMeta,
    images?:string[],
    thumbnail?:string,
}   

const ProductSchema = new mongoose.Schema<IProduct>({
title:{type:String,required:true},
description:{type:String,required:true},
category:{type:String,required:true},
price:{type:Number,required:true},
discountPercentage:{type:Number,required:true},
rating:{type:Number},
stock:{type:Number,required:true},
tags:{type:[String]},
brand:{type:String,required:true},    
weight:{type:Number},
warrantyInformation:{type:String},
shippingInformation:{type:String},
availabilityStatus:{type:String},
reviews:[
    {
        rating:{type:Number},
        comment:{type:String},
        date:{type:Date},
        reviewerName:{type:String},
        reviewerEmail:{type:String}
    }
],
returnPolicy:{type:String},
meta:{
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
},
images:{
    type:[String]
},
thumbnail:{type:String}
})

const ProductModel  = mongoose.models.Service || mongoose.model<IProduct>('Service',ProductSchema);

export default ProductModel; 