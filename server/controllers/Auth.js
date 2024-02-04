const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// signup
exports.signup = async (req, res) => {
    try {
        // fetch data from body
        const { firstName, lastName, email, password } = req.body;

        if(!firstName || !lastName || !email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        // check if user already exist
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user entry in db
        const userDetails = await User.create({firstName, lastName, email, password:hashedPassword});

        return res.status(200).json({
            success: true,
            user: userDetails,
            message: "User registered successfully",
        });

    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "signup failed from backend",
            error: error.message
        });
    }
}

// login
exports.login = async (req, res) => {
    try {
        // fetch data from body
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        // check if user exists or not
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please signup first"
            });
        }

        // match password 
        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            });
        }

        // generate jwt token
        const payload = {
            email: user.email,
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"});

        // save token to user document in database
        user.token = token;
        user.password = undefined;

        // set cookie for token and return successfull response
        const options = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        console.log("user: ", user);
        return res.cookie("token", token, options).status(200).json({
            success: true,
            token: token,
            user: user,
            message: "Logged in successfully"
        });

    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Login error from backend side",
            error: error.message
        });
    }
}