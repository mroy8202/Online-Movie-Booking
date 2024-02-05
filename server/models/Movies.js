const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    poster: {
        type: String,
        required: true,
    },
    genre: [{
        type: String,
    }],
    duration: {
        type: Number,
        required: true,
    },
    Language: [{
        type: String,
        required: true,
    }],
    Actors: [{
        type: String,
        required: true,
    }],
},{timestamps: true});

module.exports = mongoose.model("Movies", moviesSchema);