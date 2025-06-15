import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
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

export const Note = mongoose.model("Note", noteSchema);