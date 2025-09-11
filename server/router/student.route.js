const express = require("express");
const {
  getAllStudent,
  createStudent,
} = require("../controller/student.controller");

const router = express.Router();

router.get("/", getAllStudent);
router.post("/", createStudent);

module.exports = router;
