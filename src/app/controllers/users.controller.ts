import express, { Request, Response } from "express";
import { User } from "../models/users.model";
import { z } from "zod/v4";
import bcrypt from "bcryptjs";

export const userRoutes = express.Router();

const zodeValidate = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
  address: z.object({
    city: z.string(),
    post: z.string(),
    zip: z.number(),
  }),
});

// Get all users
userRoutes.get("/", async (req: Request, res: Response) => {
  const allUsers = await User.find();
  res.status(201).json({
    success: true,
    message: "All Users",
    data: allUsers,
  });
});

// Get a user
userRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const singleUser = await User.findById(userId);
  res.status(201).json({
    success: true,
    message: "Searched User",
    data: singleUser,
  });
});

// Post user data
userRoutes.post("/create-user", async (req: Request, res: Response) => {
  // const body = req.body;
  try {
    const userData = zodeValidate.parse(req.body);
    const createUser = await User.create(userData);
    const hashedPassword = await bcrypt.hash(createUser.password, 10);
    createUser.password = hashedPassword;
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: createUser,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "User creation failed",
      data: error.message,
      error,
    });
  }
});

// Update user data
userRoutes.patch(
  "/update-user/:userId",
  async (req: Request, res: Response) => {
    const userData = req.body;
    const userId = req.params.userId;
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    res.status(201).json({
      success: true,
      message: "User Updated Successfully",
      data: updatedUser,
    });
  }
);

// Delete user data
userRoutes.delete(
  "/delete-user/:userId",
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(201).json({
      success: true,
      message: "User Deleted Successfully",
      data: deletedUser,
    });
  }
);
