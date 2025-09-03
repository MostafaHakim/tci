const Slide = require("../model/slider.model");

const getAllSlider = async (req, res) => {
  try {
    const slides = await Slide.find().sort({ order: 1 });
    res.status(200).json(slides);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createNewSlide = async (req, res) => {
  try {
    const newSlide = new Slide({
      title: req.body.title,
      image: `/uploads/${req.file.filename}`, // file path
    });

    await newSlide.save();
    res.status(201).json(newSlide);
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
};

module.exports = { getAllSlider, createNewSlide };
