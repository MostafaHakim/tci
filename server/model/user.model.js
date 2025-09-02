const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: String,
  mobileNumber: String,
  course: [
    {
      courseName: String,
      duration: String,
    },
  ],
});

const userModel = new mongoose.model("user", userSchema);

module.export = userModel;
