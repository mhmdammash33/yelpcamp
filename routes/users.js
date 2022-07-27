const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utilities/catchAsync");
const passport = require("passport");
const isLoggedIn = require("../middleware/isLoggedIn");

//Controllers:
const {
  renderRegisterForm,
  registerUser,
  renderLoginForm,
  loginUser,
  logoutUser,
} = require("../controllers/users");

//REGISTER
router.get("/register", renderRegisterForm);
router.post("/register", catchAsync(registerUser));

//LOGIN
router.get("/login", renderLoginForm);
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
    keepSessionInfo: true,
  }),
  loginUser
);

//LOGOUT
router.get("/logout", isLoggedIn, logoutUser);

module.exports = router;
