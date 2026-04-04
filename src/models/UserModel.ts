import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  phoneNumber?: number;
  designation?: string;
  district?: string;
  city?: string;
  role: "user" | "admin";
  provider?: "credentials" | "google";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    designation: {
      type: String,
    },
    district: {
      type: String,
    },
    city: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dz23btt8f/image/upload/v1770033344/gbmcsdflubacnl1azh75.jpg",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
  },
  { timestamps: true },
);

// pre middleware for has password
UserSchema.pre("save", async function () {
  try {
    if (this.isModified("password")) {
      const hasedPassword = await bcrypt.hash(this.password, 10);
      this.password = hasedPassword;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
});

const UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
