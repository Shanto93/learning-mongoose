import mongoose from "mongoose";
import type { IUser } from "../interfaces/user.interfaces";

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      require: [true, "First Name is required"],
      trim: true,
      maxlength: [50, "First Name should be maximum 50 characters"],
    },
    lastName: {
      type: String,
      require: [true, "Last Name is required."],
      trim: true,
      maxlength: [50, "Last Name should be maximum 50 characters"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      max: [60, "Age should be maximum 60"],
      min: [18, "Age should be maximum 60"],
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      unique: [true, "Email should be unique"],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      require: [true, "Password is required."],
      validate: {
        validator: function (pass) {
          return /^(?=.*[A-Z])(?=.*\d).+$/.test(pass);
        },
        message:
          "Password must contain at least one uppercase letter and one number",
      },
    },
    role: {
      type: String,
      lowercase: true,
      enum: {
        values: ["admin", "user"],
        message: "Role is not valid. got {VALUE} role",
      },
      default: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
