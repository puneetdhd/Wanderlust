const express = require("express");
const router = express.Router();
const User = require("../models/user.js");  
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl}= require("../middleware.js");
const userController= require("../controllers/users.js");

router.route("/signup")
.get(userController.signupForm)
.post(wrapAsync(userController.signup));
 
router.route("/login")
.get(wrapAsync(userController.loginForm))
.post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: `/login`, failureFlash: true }), wrapAsync(userController.login));

router.get("/logout",userController.logout);

module.exports = router; 