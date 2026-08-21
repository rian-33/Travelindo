const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    estimatedBudget: { type: Number, required: true, min: 0 },
    mapLink: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Destination", destinationSchema);
