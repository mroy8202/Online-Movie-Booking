const express = require("express");
const app = express();
const cors = require("cors");

const routes = require("./routes/routes");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const port = process.env.PORT || 4000;

// connect to database
database.connect();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// connect with cloudinary
cloudinaryConnect();

// mount routes
app.use("/api/v1", routes);

// default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Welcome to default route"
    });
});

// activate server
app.listen(port, () => {
    console.log(`App is running at ${port}`);
});