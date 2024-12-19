import mongoose, { Document } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    }
    
}, {timestamps: true});

export const UserModel = mongoose.model<IUser>('User', userSchema);
