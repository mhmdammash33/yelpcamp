const User = require("../models/user");

module.exports.renderRegisterForm = (req, res) => {
  res.render("users/register");
};

module.exports.registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body.user;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.flash("success", `welcome to YelpCamp ${username.toUpperCase()}`);
    res.redirect("/campgrounds");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.loginUser = (req, res) => {
  req.flash("success", "Welcome Back Dude!!");
  const redirectUrl = req.session.returnToUrl || "/campgrounds";
  console.log(req.session);
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) req.flash("error", err.message);
    else req.flash("success", "LoggedOut Successfully!!");
    res.redirect("/campgrounds");
  });
};
