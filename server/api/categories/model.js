const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [3, "Too short"],
      maxlength: [20, "Too long"],
      required: [true, "Category name is required"],
      unique: [true, "Category name must be unique"],
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer",
      required: [true, "Organizer is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
