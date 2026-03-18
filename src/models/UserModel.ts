import bcrypt from "bcryptjs";
import mongoose from "mongoose";

interface IUser  {
    name: string,
    email: string,
    password: string,
    role?: "user" | "admin",
    avtar?: string,
}

const UserSchema =new mongoose.Schema<IUser> ({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type:String, enum: ["user", "admin"], default: "user" },
    avtar: { type: String ,default:'https://res.cloudinary.com/dz23btt8f/image/upload/v1770033344/gbmcsdflubacnl1azh75.jpg'},

}, { timestamps: true });

//
UserSchema.pre('save',async function(){
    try{
        if(this.isModified('password')) {
             this.password= await bcrypt.hash(this.password,10);
        }  
    }
    catch (error: unknown) {
    throw new Error("Error hashing password");
    }
})

const UserModel = mongoose.models.User || mongoose.model <IUser> ("User", UserSchema);

export default UserModel;