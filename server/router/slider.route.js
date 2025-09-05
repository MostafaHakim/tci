const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // File System module import

const {
  getAllSlider,
  createNewSlide,
} = require("../controller/slider.controller");

const router = express.Router();

// --- Main Fix Here: Ensure uploads directory exists ---
const uploadsDir = path.join(__dirname, "../../uploads"); // Go up two levels to the project root
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
// ----------------------------------------------------

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Use the absolute path
  },
  filename: (req, file, cb) => {
    // Create a unique filename to avoid conflicts
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Define routes
router.get("/", getAllSlider);
router.post("/", upload.single("image"), createNewSlide);

module.exports = router;
