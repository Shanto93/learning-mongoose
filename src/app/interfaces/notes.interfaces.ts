import type { Types } from "mongoose";

export interface INotes {
  title: string;
  content: string;
  categories: "personal" | "work" | "study" | "others";
  pinned: boolean;
  tags: {
    label: string;
    color: string;
  };
  user: Types.ObjectId;
}
