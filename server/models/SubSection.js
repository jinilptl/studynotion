const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Added required for better validation
  },
  timeDuration: {
    type: String,
    // required: true, // Ensures all subsections have duration
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
});

module.exports = mongoose.model("SubSection", subSectionSchema); // Removed trailing space
