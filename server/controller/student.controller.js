const Student = require("../model/student.model");
const cloudinary = require("cloudinary").v2;

// Configure cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
cloudinary.config({
  cloud_name: "doyhiacif",
  api_key: "221424586279484",
  api_secret: "7zGbqoNSC4FkgeKWPQcwBPVxTCs",
});

const createStudent = async (req, res) => {
  try {
    const { studentName, studentMobile, courseName, courseDuration, address } =
      req.body;
    const file = req.file; // যদি multer ব্যবহার করে থাকো

    if (!file)
      return res.status(400).json({ message: "Please upload an image" });

    // Cloudinary-তে আপলোড
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "students", // folder name in cloudinary
    });

    // নতুন স্টুডেন্ট তৈরি
    const newStudent = new Student({
      studentName,
      studentMobile,
      courseName,
      courseDuration,
      address,
      studentImageUrl: result.secure_url, // Cloudinary URL
      studentImageId: result.public_id, // Cloudinary public_id
    });

    await newStudent.save();
    return res
      .status(201)
      .json({ message: "New Student Added", student: newStudent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
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
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Cloudinary থেকে ছবি মুছে দিন
    if (student.studentImageId) {
      await cloudinary.uploader.destroy(student.studentImageId);
    }

    // MongoDB থেকে ডিলিট করুন
    await student.deleteOne();

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllStudent, createStudent, deleteStudent };
