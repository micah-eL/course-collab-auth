const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require("../models/users");


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const userToLogin = await User.findOne({email: email});
    if (!userToLogin) {
        return res.status(400).json({status: "fail", data: "Email does not exist. Please sign up or use a different email."});
    }

    console.log("Logging in as: " + userToLogin);
    const passwordCorrect = await bcrypt.compare(password, userToLogin.passwordHash);
    if (!passwordCorrect) {
        return res.status(400).json({status: "fail", data: "Invalid password."});
    }

    const userFieldsForToken = {
        firstName: userToLogin.firstName,
        lastName: userToLogin.lastName,
        id: userToLogin._id
    }
    const token = jwt.sign(  // no expiration time for token for now
        userFieldsForToken,
        "tmp-prod-secret" //process.env.SECRET
    )
    res.status(200).send({status: "success", data: userToLogin, token: token});
}


module.exports = { 
    loginUser 
};