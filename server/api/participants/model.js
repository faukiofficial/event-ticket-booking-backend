const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const participantSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "User name is required"],
        minlength: [3, "Too short"],
        maxlength: [30, "Too long"],
    },
    lastName: {
        type: String,
        required: [true, "User name is required"],
        minlength: [3, "Too short"],
        maxlength: [30, "Too long"],
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
        default: "-",
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    otp: {
        type: String,
    }
}, { timestamps: true });

participantSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

participantSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model("Participant", participantSchema);

