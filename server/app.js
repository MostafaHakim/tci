const express = require("express");
const cors = require("cors");

const app = express();

const mongoose = require("mongoose");
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userRoute = require("./router/user.route");
const sliderRoute = require("./router/slider.route");

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
