const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utilities/catchAsync");
const passport = require("passport");
const isLoggedIn = require("../middleware/isLoggedIn");

//REGISTER
router.get("/register", (req, res) => {
  res.render("users/register");
});
router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body.user;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
      });
      req.flash("success", `welcome to YelpCamp ${username.toUpperCase()}`);
      res.redirect("/campgrounds");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);

//LOGIN
router.get("/login", (req, res) => {
  res.render("users/login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
    keepSessionInfo: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome Back Dude!!");
    const redirectUrl = req.session.returnToUrl || "/campgrounds";
    console.log(req.session);
    res.redirect(redirectUrl);
  }
);

//LOGOUT
router.get("/logout", isLoggedIn, (req, res) => {
  req.logout((err) => {
    if (err) req.flash("error", err.message);
    else req.flash("success", "LoggedOut Successfully!!");
    res.redirect("/campgrounds");
  });
});

module.exports = router;
