const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentName: String,
  studentImageUrl: String,
  studentMobile: String,
  courseName: String,
  courseDuration: String,
  address: String,
  admissionDate: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
