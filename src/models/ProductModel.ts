import mongoose from "mongoose";

// reviews interface 
interface IReviews{
        rating:number;
        comment:string;
        date:Date;
        reviewerName:string;
        reviewerEmail:string;
    }

    // dimensions interface
    interface IDimensions{
        width?:number,
        height?:number,
        depth?:number,
    };

    // product meta interface
    interface IProductMeta{
    createdAt:Date,
    updatedAt:Date,
    barcode:number,
    qrCode:string,
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
    sku:string,
    weight?:number,
    dimensions?:IDimensions,
    warrantyInformation?:string,
    shippingInformation?:string,
    availabilityStatus?:string,
    reviews?:IReviews[],
    returnPolicy?:string,
    minimumOrderQuantity?:number,
    meta?:IProductMeta,
    images?:string[],
    thumbnail?:string,
}   

const ProductModel = new mongoose.Schema<IProduct>({
title:{type:String,required:true},
description:{type:String,required:true},
category:{type:String,required:true},
price:{type:Number,required:true},
discountPercentage:{type:Number,required:true},
rating:{type:Number},
stock:{type:Number,required:true},
tags:{type:[String]},
brand:{type:String,required:true},
sku:{type:String,required:true},    
weight:{type:Number},
dimensions:{
    width:{type:Number},
    height:{type:Number},
    depth:{type:Number}
},
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
minimumOrderQuantity:{type:Number},
meta:{
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
    barcode:{type:Number},
    qrCode:{type:String},
},
images:{
    type:[String]
},
thumbnail:{type:String}
})

const product = mongoose.models.Product || mongoose.model<IProduct>('Product',ProductModel);

export default product; 