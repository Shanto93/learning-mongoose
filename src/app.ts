import express, { Application, Request, Response } from "express";
import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const app: Application = express();

app.use(express.json());

const noteSchema = new mongoose.Schema({
  title: { type: String, require: true, trim: true },
  content: { type: String, default: "" },
  categories: {
    type: String,
    enum: ["personal", "work", "study", "others"],
    default: "personal",
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  tags: {
    label: { type: String, require: true },
    color: { type: String, default: "gray" },
  },
});

const Note = mongoose.model("Note", noteSchema);

// GET ALL Notes
app.get("/notes", async (req: Request, res: Response) => {
  const notes = await Note.find();
  res.status(201).json({
    success: true,
    message: "All Notes",
    note: notes,
  });
});

// GET Single Note
app.get("/notes/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const filter = {
    _id: new ObjectId(id),
  };
  const note = await Note.findOne(filter);
  res.status(201).json({
    success: true,
    message: "Your Searched note",
    note: note,
  });
});

// POST note
app.post("/note/create-note", async (req: Request, res: Response) => {
  const body = req.body;

  //Approach-1
  // const myNote = new Note({
  //   title: "Learning Express",
  //   content: "I am learning Express",
  //   tags:{
  //     label: "Express",
  //     color: "red"
  //   }
  // });
  // await myNote.save();

  //Approach-2
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: note,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note apps!");
});

export default app;
