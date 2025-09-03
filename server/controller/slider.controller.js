const Slide = require("../model/slider.model");

const getAllSlider = async (req, res) => {
  const slides = await Slide.find().sort({ order: 1 });
  if (!slides) {
    return res.status(404).json({ message: "no slide found" });
  }
  res.status(200).json(slides);
};
// POST new slide
const createNewSlide = async (req, res) => {
  const newSlide = new Slide(req.body);
  await newSlide.save();
  res.json(newSlide);
};

module.exports = { getAllSlider, createNewSlide };
