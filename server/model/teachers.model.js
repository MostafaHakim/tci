const mongoose = require("mongoose");
const teacherSchema = mongoose.Schema({
  teacherName: String,
  seletedCourse: String,
  descriptions: String,
  teacherImageUrl: String,
  teacherImageId: String,
});

module.exports = mongoose.model("teachers", teacherSchema);
