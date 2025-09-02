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

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
