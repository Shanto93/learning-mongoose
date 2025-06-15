import mongoose from "mongoose";
import type { IUser } from "../interfaces/user.interfaces";

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
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
