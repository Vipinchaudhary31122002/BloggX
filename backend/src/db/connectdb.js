const mongoose = require("mongoose")
const {MONGODB_URL} = require("")
import { MONGODB_URL } from "../constants.js";

const dbName = "BloggX";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL, { dbName });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;