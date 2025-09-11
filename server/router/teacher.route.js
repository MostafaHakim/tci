const express = require("express");
const {
  getAllTeacher,
  createTeacher,
} = require("../controller/teacher.controller");

const router = express.Router();

router.get("/", getAllTeacher);
router.post("/", createTeacher);

module.exports = router;
