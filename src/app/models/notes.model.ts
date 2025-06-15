import mongoose from "mongoose";
import { INotes } from "./../interfaces/notes.interfaces";

const noteSchema = new mongoose.Schema<INotes>(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Note = mongoose.model<INotes>("Note", noteSchema);
