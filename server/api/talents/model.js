const mongoose = require("mongoose");

const talentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: [3, "Too short"],
            maxlength: [30, "Too long"],
            required: [true, "Talent name is required"],
            unique: [true, "Talent name must be unique"],
        },
        role: {
            type: String,
            minlength: [3, "Too short"],
            maxlength: [20, "Too long"],
            required: [true, "Talent role is required"],
            default: "-",
        },
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image",
            required: [true, "Talent image is required"],
        },
        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organizer",
            required: [true, "Organizer is required"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Talent", talentSchema);