const mongoose = require("mongoose");

const siteInfoSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: true,
      default: "My Awesome Site",
    },
    address: {
      type: String,
      required: true,
      default: "Dhaka, Bangladesh",
    },
    mobile: {
      type: String,
      required: true,
      default: "0123456789",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteInfo", siteInfoSchema);
