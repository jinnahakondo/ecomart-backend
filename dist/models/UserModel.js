"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userInterface = {
    name: string,
    email: string,
    password: string,
    role: "user" | "admin"
};
const UserSchema = mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { enum: ["user", "admin"], default: "user" },
}, { timestamps: true });
const UserModel = mongoose_1.default.models.User || mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
