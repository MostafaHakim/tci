const Slide = require("../model/slider.model");

// GET all slides
const getAllSlider = async (req, res) => {
  try {
    const slides = await Slide.find().sort({ order: 1 });
    if (!slides || slides.length === 0) {
      return res.status(404).json({ message: "No slides found" });
    }
    res.status(200).json(slides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST new slide
const createNewSlide = async (req, res) => {
  try {
    const { title, image, order } = req.body;
    if (!title || !image) {
      return res.status(400).json({ message: "Title and Image are required" });
    }

    const newSlide = new Slide({ title, image, order });
    await newSlide.save();

    res.status(201).json(newSlide);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create slide" });
  }
};

module.exports = { getAllSlider, createNewSlide };
