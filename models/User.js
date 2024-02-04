const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    bookedMovies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movies",
    }],
},{timestamps: true});

module.exports = mongoose.model("User", userSchema);