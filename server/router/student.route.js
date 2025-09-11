const express = require("express");
const {
  getAllStudent,
  createStudent,
  deleteStudent,
} = require("../controller/student.controller");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.get("/", getAllStudent);
router.post("/", upload.single("file"), createStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
