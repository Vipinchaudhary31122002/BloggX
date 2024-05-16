import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import multer from "multer";
// import fs from "fs";
// import path from "path";
import { fileURLToPath } from "url";

// importing routes
import AuthRoute from "./routes/AuthRoute.js";
import PostsRoute from "./routes/PostsRoute.js";

// accessing file and folder in backend for image handling
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const uploadmiddleware = multer({ dest: "uploads/" });

const app = express();
// app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());
// routes declaration
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/post", PostsRoute);

export default app;
