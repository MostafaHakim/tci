const express = require("express");
const {
  getAllSlider,
  createNewSlide,
} = require("../controller/slider.controller");

const router = express.Router();

// GET all slides
router.get("/", getAllSlider);

// POST new slide
router.post("/", createNewSlide);
module.exports = router;
