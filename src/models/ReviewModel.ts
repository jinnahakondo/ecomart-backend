import mongoose from "mongoose";

interface IReview {
  name: string;
  email: string;
  image?: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new mongoose.Schema<IReview>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: String,
    comment: {
      type: String,
      requiredPaths: true,
    },
  },
  { timestamps: true },
);

const ReviewModel =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default ReviewModel;
