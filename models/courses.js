const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
    id: String,
    courseName: String,
}, { timestamps: true });


module.exports = mongoose.model("Course", courseSchema);