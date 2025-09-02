const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./router/user.route");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URI =
  "mongodb+srv://tci:tci1234@cluster0.0cwne57.mongodb.net/tci?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/user", userRoute);

app.use((req, res) => {
  res.status(404).send("Route not found");
});

module.exports = app;
