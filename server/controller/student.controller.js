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

const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllStudent, createStudent, deleteStudent };
