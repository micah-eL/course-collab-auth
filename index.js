// Instantiate and setup Express app
const gcpMetadata = require('gcp-metadata');
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.API_PORT;
app.use(express.json());
app.set("json spaces", 4);
app.use(express.static(__dirname + "/public")); 


// Start server once connected to database
const mongoose = require("mongoose");
getConnection = async () => {
    try {
        const metadataIsAvailable = await gcpMetadata.isAvailable();
        if (metadataIsAvailable) {
            await mongoose.connect(
                await gcpMetadata.instance('MONGODB_ATLAS_URI'),
                { }
            );
        }
        else {
            await mongoose.connect(
                process.env.MONGODB_ATLAS_URI,
                { }
            );
        }
        console.log("Connected to db...");
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is listening on http://0.0.0.0:${PORT} ...`);
        });
    } catch (err) {
        console.log(err);
    }
};

getConnection();


// Import and setup middleware
const logger = require("./middleware/logger");
app.use("/api", [logger]);


// Import and setup routes
app.get("/api/health", (req, res) => {
    res.status(200).json({health: "Course Collab auth service OK"});
});

const authRouter = require('./routes/auth');
app.use("/api/auth", authRouter);

const usersRouter = require('./routes/users');
app.use("/api/users", usersRouter);


