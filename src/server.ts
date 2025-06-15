import type { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
const port = 5000;
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://mongooseDB:jiK4ds7FppK1izJc@cluster0.tuf9wrv.mongodb.net/advance-note-app?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB using Mongoose...");
    server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();