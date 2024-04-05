const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');


const userSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: function genUUID() {
            return uuidv4();
        } 
    },
    email: String,
    passwordHash: String,
    firstName: String,
    lastName: String,
    joinedCourses: [String],
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);