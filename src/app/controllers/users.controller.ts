import express, { Request, Response } from "express";
import { User } from "../models/users.model";

export const userRoutes = express.Router();

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
  const userData = req.body;
  const createUser = await User.create(userData);
  res.status(201).json({
    success: true,
    message: "User Created Successfully",
    data: createUser,
  });
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
