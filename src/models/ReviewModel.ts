import mongoose from "mongoose";

// Review document structure
interface IReview {
  reviewerName: string;
  email: string;
  avatar?: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

// Review Schema - stores user feedback
const ReviewSchema = new mongoose.Schema<IReview>(
  {
    reviewerName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: String,
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const ReviewModel =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default ReviewModel;
