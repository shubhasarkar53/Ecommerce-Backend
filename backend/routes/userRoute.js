const express = require("express");
const { registerUser, loginUser, getAllUser, logoutUser } = require("../controller/userController");
const router = express.Router();

//route register user 
router.route("/register").post(registerUser);
// login
router.route("/login").post(loginUser);
// logout
router.route("/logout").get(logoutUser);
// getalluse
router.route("/getusers").get(getAllUser); 

module.exports = router;