import mongoose from "mongoose";
import { settings } from "./settings";

export async function connectDB() {
  try {
    await mongoose.connect(settings.db_connection_string);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error", err);
    process.exit(1);
  }
}
