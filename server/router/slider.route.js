const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getAllSlider,
  createNewSlide,
} = require("../controller/slider.controller");

const router = express.Router();

// storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // uploads folder এ save হবে
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});

const upload = multer({ storage });

// routes
router.get("/", getAllSlider);
router.post("/", upload.single("image"), createNewSlide);

module.exports = router;
