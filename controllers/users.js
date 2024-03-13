const bcrypt = require('bcrypt')

const User = require("../models/users");


const saltRounds = 10;


// Get all Users
const getAllUsers = async (req, res) => {
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
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new User(email, passwordHash, firstName, lastName);
    try {
        const createdUser = await newUser.save();
        res.status(201).json({status: "success", data: createdUser});
    } catch(err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

// Update User
const updateUser = async (req, res) => {
    // TODO
    res.status(501).json({status: "fail", data: "Update not implemented"});
};

// Delete User
const deleteUser = async (req, res) => {
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