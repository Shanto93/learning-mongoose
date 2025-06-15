import express, { Application, Request, Response } from "express";
import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import { noteRoutes } from "./app/controllers/notes.controllers";

export const app: Application = express();

app.use(express.json());

app.use("/notes", noteRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note apps!");
});

export default app;
