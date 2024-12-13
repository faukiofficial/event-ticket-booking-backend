const mongoose = require("mongoose");

const ticketCategorySchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: [true, "Ticket category type is required"],
        },
        price: {
            type: Number,
            default: 0,
        },
        stock: {
            type: Number,
            default: 0,
        },
        statusTicketCategories: {
            type: Boolean,
            enum: [true, false],
            default: true
        },
        expiredDate: {
            type: Date,
        },
    },
    { timestamps: true }
);

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Event title is required"],
            unique: [true, "Event title must be unique"],
            minlength: [3, "Too few characters"],
            maxlength: [50, "Too many characters"],
        },
        date: {
            type: Date,
            required: [true, "Event date is required"],
        },
        about: {
            type: String,
        },
        tagline: {
            type: String,
            required: [true, "Event tagline is required"],
        },
        keyPoint: {
            type: [String],
        },
        vanueName: {
            type: String,
            required: [true, "Event vanue name is required"],
        },
        statusEvent: {
            type: String,
            enum: ["Draft", "Published"],
            default: "Draft",
        },
        tickets: {
            type: [ticketCategorySchema],
            required: [true, "Event tickets is required"],
        },
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image",
            required: [true, "Event image is required"],
        },
        talent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Talent",
            required: [true, "Event talent is required"],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Event category is required"],
        },
        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organizer",
            required: [true, "Organizer is required"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);