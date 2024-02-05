const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Movies = require("../models/Movies");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

function isFileTypeSupported(photoType, supportedTypes) {
    return supportedTypes.includes(photoType);
}

// createMoviePost
exports.createMoviePost = async (req, res) => {
    try {
        // fetch all data from req body
        const { title, about, releaseDate, genre, duration, Language, Actors } = req.body;

        // fetch poster
        const photo = req.files.posterPicture;

        // check if data is valid
        if(!title || !about || !releaseDate || !genre || !duration || !Language || !Actors || !photo) {
            return res.status(500).json({
                success: false,
                message: "Fill all the required data",
            });
        }
        
        // validation on image
        const supportedTypes = ["jpg", "jpeg", "png"];
        const photoType = photo.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(photoType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            });
        }

        // upload poster to cloudinary
        const image = await uploadImageToCloudinary(photo, process.env.FOLDER_NAME);

        // create an entry in Movie Database
        const movie = await Movies.create({
            title, 
            about, 
            releaseDate, 
            poster: image.secure_url,
            posterPublicId: image.public_id,
            genre, 
            duration, 
            Language, 
            Actors
        });

        // return response
        return res.status(200).json({
            success: true,
            message: "movie created successfully",
            data: movie,
        });
    }
    catch(error) {
        console.error("Error creating movie post:", error);
        return res.status(500).json({
            success: false,
            message: "could not create a movie post from backend",
            error: error.message,
        });
    }
}

// deleteMoviePost
exports.deleteMoviePost = async (req, res) => {
    try {
        // fetch movie id
        const movieId = req.params.id;
        // console.log("Movie id: ", movieId);
        
        // fetch movie
        const movie = await Movies.findById(movieId);
        if(!movie) {
            return res.status(401).json({
                success: false,
                message: "Movie not found with given movieId",
            });
        }

        // delete movie poster from cloudinary
        try {
            await cloudinary.uploader.destroy(movie.posterPublicId);
        }
        catch(error) {
            return res.status(401).json({
                success: false,
                message: "Error in deleting poster from cloudinary",
                error: error.message
            });
        }

        // delete movie from database
        const deletedMovie = await Movies.findByIdAndDelete(movieId);

        return res.status(200).json({
            success: true,
            message: "Movie deleted successfully",
            deletedMovie: deletedMovie
        });
    }
    catch(error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Cannot delete movie post",
            error: error.message
        });
    }
}

// getAllMovies
// exports.getAllMovies = async (req, res) => {
//     try {
        
//     }
//     catch(error) {
//         return res.status(200).json({
//             success: false,
//             message: "Cannot fetch movies from backend",
//             error: error.message
//         });
//     }
// }