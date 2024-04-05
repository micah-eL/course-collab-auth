const bcrypt = require('bcrypt')

const constants = require('../constants');
const User = require("../models/users");


// Get all Users
const getAllUsers = async (req, res) => {
    // TODO: Verify user is admin via JWT 
    try {
        const allUsers = await User.find();
        res.status(200).json({status: "success", data: allUsers});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

// Get individual User
const getUserWithID = async (req, res) => {
    const {userID} = req.params;
    try {
        const queriedUser = await User.findById(userID);
        res.status(200).json({status: "success", data: queriedUser});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

// Create new User
const createUser = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    
    const emailExists = await User.findOne({email: email});
    if (emailExists) {
        return res.status(400).json({status: "fail", data: "Email already exists. Please log in or use a different email."});
    }
    
    const passwordHash = await bcrypt.hash(password, constants.SALT_ROUNDS);
    const newUser = new User({email, passwordHash, firstName, lastName});
    try {
        const createdUser = await newUser.save();
        res.status(201).json({status: "success", data: createdUser});
    } catch(err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

// Update User
const updateUser = async (req, res) => {
    const {userID} = req.params;
    try {
        const queriedUser = await User.findById(userID);
        if (req.body.joinedCourses != null) {
            queriedUser.joinedCourses = req.body.joinedCourses;
        }
        const updatedUser = await queriedUser.save();
        res.status(200).json({status: "success", data: updatedUser});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }


};

// Delete User
const deleteUser = async (req, res) => {
    // TODO: Verify user is admin or user to be deleted via JWT
    const {userID} = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(userID);
        res.status(204).json({status: "success", data: deletedUser});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};


module.exports = {
    getAllUsers,
    getUserWithID,
    createUser,
    updateUser,
    deleteUser
};