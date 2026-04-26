import mongoose, { Types } from "mongoose";

interface IOrder {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  price: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "processing" | "shipped" | "out for delivery" | "delivered" | "cancelled";
  tracking: [
    {
      status: string,
      date: { type: Date }
    }
  ]
  address: {
    fullName: string;
    phone: string;
    district: string;
    city: string;
    area: string;
    postalCode: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "processing", "shipped", "out for delivery", "delivered", "cancelled"],
      default: "pending",
    },
    tracking: [
      {
        status: String,
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    address: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      district: { type: String, required: true },
      city: { type: String, required: true },
      area: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
  },
  { timestamps: true },
);

const OrderModel =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default OrderModel;
