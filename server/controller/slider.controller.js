const Slide = require("../model/slider.model");

const getAllSlider = async (req, res) => {
  try {
    const slides = await Slide.find().sort({ order: 1 });
    res.status(200).json(slides);
  } catch (err) {
    console.error("Error fetching slides:", err);
    res.status(500).json({ message: "Server error while fetching slides." });
  }
};

const createNewSlide = async (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "Image is required." });
  }

  try {
    const newSlide = new Slide({
      title: req.body.title,
      // Save the publicly accessible path, not the file system path
      image: `/uploads/${req.file.filename}`,
    });

    await newSlide.save();
    res.status(201).json(newSlide);
  } catch (err) {
    console.error("Error creating slide:", err);
    res
      .status(500)
      .json({ message: "Slide creation failed due to a server error." });
  }
};

module.exports = { getAllSlider, createNewSlide };
