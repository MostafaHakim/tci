const Teacher = require("../model/teachers.model");

const createTeacher = async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    if (!newTeacher) {
      return res.status(400).json({ message: "Please Input Correct Data" });
    }
    await newTeacher.save();
    return res.status(201).json({ message: "Teacher Added successfully" });
  } catch (error) {
    console.error(error);
  }
};

const getAllTeacher = async (req, res) => {
  try {
    const getTeacher = await Teacher.find();
    if (!getTeacher) {
      return res.status(400).json({ message: "No teacher exist" });
    }
    return res.status(200).json(getTeacher);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllTeacher, createTeacher };
