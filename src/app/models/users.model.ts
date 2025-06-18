import mongoose from "mongoose";
import type { IAddress, IUser } from "../interfaces/user.interfaces";
import validator from "validator";

const addressSchema = new mongoose.Schema<IAddress>(
  {
    city: String,
    post: String,
    zip: Number,
  },
  {
    _id: false,
  }
);

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      maxlength: [50, "First Name should be maximum 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required."],
      trim: true,
      maxlength: [50, "Last Name should be maximum 50 characters"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      max: [60, "Age should be maximum 60"],
      min: [18, "Age should be minimum 18"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email should be unique"],
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Invalid Email {VALUE}"],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
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
    address: {
      type: addressSchema,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
