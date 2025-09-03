const Slide = require("../model/slider.model");

const getAllSlider = async (req, res) => {
  const slides = await Slide.find().sort({ order: 1 });
  res.json(slides);
};
// POST new slide
const createNewSlide = async (req, res) => {
  const newSlide = new Slide(req.body);
  await newSlide.save();
  res.json(newSlide);
};

module.exports = { getAllSlider, createNewSlide };
