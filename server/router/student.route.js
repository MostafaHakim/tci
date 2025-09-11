const express = require("express");
const {
  getAllStudent,
  createStudent,
  deleteStudent,
} = require("../controller/student.controller");

const router = express.Router();

router.get("/", getAllStudent);
router.post("/", createStudent);
router.delete("/student/:id", deleteStudent);

module.exports = router;
