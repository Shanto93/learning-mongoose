export interface INotes {
  title: string;
  content: string;
  categories: "personal" | "work" | "study" | "others";
  pinned: boolean;
  tags: {
    label: string;
    color: string;
  };
}