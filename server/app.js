const express = require("express");
const app = express();

const userRoute = require("./router/user.route");
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const MONGO_URI = "mongodb://127.0.0.1:27017/mydatabase";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
