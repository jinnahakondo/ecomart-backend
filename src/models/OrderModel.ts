import mongoose, { Types } from "mongoose";

interface IOrder {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  price: number;
  status: "pending" | "confirmed" | "cancelled";
  address: {
    fullName: string;
    phone: string;
    country: string;
    city: string;
    area: string;
    postalCode: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    userId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    address: {
      fullName: String,
      phone: String,
      country: String,
      city: String,
      area: String,
      postalCode: String,
    },
  },
  { timestamps: true },
);

const OrderModel =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default OrderModel;
