const Teacher = require("../model/teachers.model");
const cloudinary = require("../config/cloudinary");

// Create Teacher
const createTeacher = async (req, res) => {
  try {
    const { teacherName, selectedCourse, descriptions } = req.body;

    let teacherImageUrl = null;
    let teacherImageId = null;

    // Cloudinary তে upload
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "teachers" }, // optional folder
        (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ message: "Image upload failed" });
          }

          teacherImageUrl = result.secure_url;
          teacherImageId = result.public_id;

          // Save Teacher after upload
          saveTeacher();
        }
      );

      // stream end করতে হবে
      result.end(req.file.buffer);
    } else {
      // Without image
      saveTeacher();
    }

    // ফাংশন আলাদা করে
    const saveTeacher = async () => {
      const newTeacher = new Teacher({
        teacherName,
        selectedCourse,
        descriptions,
        teacherImageUrl,
        teacherImageId,
      });

      await newTeacher.save();
      return res
        .status(201)
        .json({ message: "Teacher Added successfully", teacher: newTeacher });
    };
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating teacher" });
  }
};

// Get All Teachers
const getAllTeacher = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    if (!teachers || teachers.length === 0) {
      return res.status(404).json({ message: "No teacher exist" });
    }
    return res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching teachers" });
  }
};

module.exports = { getAllTeacher, createTeacher };
