import mongoose from "mongoose";
import type { IUser } from "../interfaces/user.interfaces";

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
      maxlength: [50, "First Name should be maximum 50 characters"],
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
      maxlength: [50, "Last Name should be maximum 50 characters"],
    },
    age: {
      type: Number,
      required: true,
      max: [60, "Age should be maximum 60"],
      min: [18, "Age should be maximum 60"],
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      lowercase: true,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
