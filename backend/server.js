const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./src/models/UserModel");
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://vipinchaudhary31122002:wfVEGhtvR3gJZEDD@bloggx.6cs0sts.mongodb.net/?retryWrites=true&w=majority&appName=BloggX`
);

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  await User.create({ username, email, password });
  console.log("user successfully created");
  // res.json("Hello world test ok");
});

app.listen(4000);
