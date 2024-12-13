const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Payment type is required"],
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
        required: [true, "Payment image is required"],
    },
    status: {
        type: Boolean,
        enum: [true, false],
        required: [true, "Payment status is required"],
        default: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organizer",
        required: [true, "Organizer is required"],
    }
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);