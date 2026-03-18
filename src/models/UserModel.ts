import mongoose from "mongoose";

const userInterface = {
    name: string,
    email: string,
    password: string,
    role: "user" | "admin"
}

const UserSchema = mongoose.Schema < userInterface > ({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { enum: ["user", "admin"], default: "user" },
}, { timestamps: true });

const UserModel = mongoose.models.User || mongoose.model < userInterface > ("User", UserSchema);

export default UserModel;