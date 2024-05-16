import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// importing routes
import AuthRoute from "./routes/AuthRoute.js";
import PostsRoute from "./routes/PostsRoute.js";
const app = express();

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
