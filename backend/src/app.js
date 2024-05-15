import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// importing routes
// import AuthRoute from "./routes/AuthRoute.js";
// import ResumeRoute from "./routes/ResumeRoute.js";
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
app.get("/data", (req, res) => {
  res.json({
    name: "indutech",
    mission: "success",
  });
});
// routes declaration
// app.use("/api/v1/auth", AuthRoute);
// app.use("/api/v1/resumes", ResumeRoute);

export default app;
