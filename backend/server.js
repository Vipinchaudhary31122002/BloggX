const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  // res.json("Hello world test ok");
});

app.listen(4000);
