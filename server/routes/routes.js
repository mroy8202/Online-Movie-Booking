const express = require("express");
const router = express.Router();

// import controllers and middlewares
const { signup, login } = require("../controllers/Auth");
const { createMoviePost } = require("../controllers/Movies");
const { auth, isAdmin } = require("../middlewares/auth");

// route handlers
router.post("/signup", signup);
router.post("/login", login);

router.post("/createMoviePost", auth, isAdmin, createMoviePost);

// export 
module.exports = router;