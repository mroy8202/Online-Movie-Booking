const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth middleware
exports.auth = async (req, res, next) => {
    try {
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        // validate token
        if(!token || token === undefined) {
            return res.status(400).json({
                success: false,
                message: "Token is missing"
            });
        }

        // verify token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("Decoded token: ", decoded);
            req.user = decoded;
        }
        catch(err) {
            return res.status(400).json({
                success: false,
                message: "Token is invalid",
                err: err.message,
            });
        }

        next();
    }
    catch(error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while validating the token from backend",
            error: error.message
        });
    }
}

// isAdmin middleware
exports.isAdmin = async (req, res, next) => {
    try {
        if(req.user.email !== "mroy8202@gmail.com") {
            return res.status(400).json({
                success: false,
                message: "This is a protected route for Admin only"
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Admin cannot be verified"
        });
    }
}