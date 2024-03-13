const express = require("express");
const router = express.Router();


const {
    getAllUsers,
    getUserWithID,
    createUser,
    updateUser,
    deleteUser
} = require("../../controllers/users");


router.get("/", getAllUsers);
router.get("/:userID", getUserWithID);

router.post("/", createUser);

router.patch("/:userID", updateUser);

router.delete("/:userID", deleteUser);


module.exports = router;