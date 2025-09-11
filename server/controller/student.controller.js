const Student = require("../model/student.model");

const createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    if (!newStudent) {
      return res.status(400).json({ message: "Please Fill the form data" });
    }
    await newStudent.save();
    return res.status(201).json({ message: "New Student Added" });
  } catch (error) {
    console.error(error);
  }
};

const getAllStudent = async (req, res) => {
  try {
    const getStudent = await Student.find();
    if (!getStudent) {
      return res.status(400).json({ message: "No Student Exist" });
    }
    return res.status(200).json(getStudent);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllStudent, createStudent };
