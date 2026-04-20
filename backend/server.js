require("dotenv").config();

const express = require("express");
const cors = require("cors");

const chatRoutes = require("./routes/chat");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});