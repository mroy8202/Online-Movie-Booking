const express = require("express");
const router = express.Router();

// import controllers and middlewares
const { signup, login } = require("../controllers/Auth");
const { createMoviePost, deleteMoviePost } = require("../controllers/Movies");
const { auth, isAdmin } = require("../middlewares/auth");

// route handlers
router.post("/signup", signup);
router.post("/login", login);

router.post("/createMoviePost", auth, isAdmin, createMoviePost);
router.delete("/deleteMoviePost/:id", auth, isAdmin, deleteMoviePost);

// export 
module.exports = router;