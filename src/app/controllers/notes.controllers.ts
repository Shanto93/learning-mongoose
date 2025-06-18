import express, { type Request, type Response } from "express";
import { Note } from "../models/notes.model";

export const noteRoutes = express.Router();

// GET ALL Notes
noteRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find().populate("user");
  res.status(201).json({
    success: true,
    message: "All Notes",
    note: notes,
  });
});
// GET Single Note
noteRoutes.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const note = await Note.findById(id);
  res.status(201).json({
    success: true,
    message: "Your Searched note",
    note: note,
  });
});
// POST note
noteRoutes.post("/create-note", async (req: Request, res: Response) => {
  const body = req.body;

  //noteRoutesroach-1
  // const myNote = new Note({
  //   title: "Learning Express",
  //   content: "I am learning Express",
  //   tags:{
  //     label: "Express",
  //     color: "red"
  //   }
  // });
  // await myNote.save();

  //noteRoutesroach-2
  const note = await await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: note,
  });
});
// Update a Note
noteRoutes.patch("/update-note/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  // const filter = {
  //   _id: new ObjectId(id),
  // };

  // const updatedNote = {
  //   $set: {
  //     title: body.title,
  //     content: body.content,
  //     categories: body.categories,
  //     pinned: body.pinned,
  //     tags: body.tags,
  //   },
  // };

  const note = await Note.findByIdAndUpdate(id, body, { new: true });
  res.status(201).json({
    success: true,
    message: "Updated Note",
    note: note,
  });
});
// Delete a Note
noteRoutes.delete("/delete-note/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const deletedNote = await Note.findByIdAndDelete(id);
  res.status(201).json({
    success: true,
    message: "Deleted Note",
    note: deletedNote,
  });
});
