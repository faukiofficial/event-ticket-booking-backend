const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: [3, "Too short"],
            maxlength: [30, "Too long"],
            required: [true, "User name is required"],
        },
        email: {
            type: String,
            required: [true, "User email is required"],
            unique: [true, "Email already exist"],
        },
        password: {
            type: String,
            required: [true, "User password is required"],
        },
        role: {
            type: String,
            enum: ["admin", "organizer", "owner"],
            default: "admin",
        },
        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organizer",
            required: [true, "Organizer is required"],
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model("User", userSchema);