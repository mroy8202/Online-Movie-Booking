const express = require("express");
const router = express.Router();

// import controllers and middlewares
const { signup, login } = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");

// route handlers
router.post("/signup", signup);
router.post("/login", login);

// export 
module.exports = router;