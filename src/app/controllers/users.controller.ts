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
