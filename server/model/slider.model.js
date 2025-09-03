import mongoose from "mongoose";

const slideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String, // আপনি image URL বা path রাখবেন
    required: true,
  },
  order: {
    type: Number, // চাইলে স্লাইডের অর্ডার বা position ট্র্যাক করতে পারেন
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Slide = mongoose.model("Slide", slideSchema);

export default Slide;
