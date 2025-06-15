import express, { Application, Request, Response } from "express";
import { noteRoutes } from "./app/controllers/notes.controllers";
import { userRoutes } from "./app/controllers/users.controller";

export const app: Application = express();

app.use(express.json());

app.use("/notes", noteRoutes);
app.use("/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note apps!");
});

export default app;
