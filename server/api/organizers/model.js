const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema(
    {
        organizerName: {
            type: String,
            minlength: [3, "Too short"],
            maxlength: [30, "Too long"],
            required: [true, "Organizer name is required"],
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Organizer", organizerSchema);