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
    genre: {
        type: String,
        enum: ["Action", "Horror", "Comedy", "Drama"]
    },
    duration: {
        type: timestamps,
        required: true,
    },
    Language: {
        type: String,
        enum: ["Hindi", "English"],
        required: true,
    },
    Actors: [{
        type: String,
        required: true,
    }],
},{timestamps: true});

module.exports = mongoose.model("Movies", moviesSchema);