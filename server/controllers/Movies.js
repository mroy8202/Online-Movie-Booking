const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Movies = require("../models/Movies");
require("dotenv").config();

function isFileTypeSupported(photoType, supportedTypes) {
    return supportedTypes.includes(photoType);
}

// createMoviePost
exports.createMoviePost = async (req, res) => {
    try {
        // fetch all data from req body
        const { title, about, releaseDate, genre, duration, Language, Actors } = req.body;

        console.log("title: ", title);
        console.log("photo: ", req.files.posterPicture);

        // check if data is valid
        if(!title || !about || !releaseDate || !genre || !duration || !Language || !Actors) {
            return res.status(500).json({
                success: false,
                message: "Fill all the required data",
            });
        }
 
        // fetch movie poster
        const photo = req.files.posterPicture;
        console.log("photo: ", photo);

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