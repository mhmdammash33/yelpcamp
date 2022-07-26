const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnToUrl = req.originalUrl;
    req.flash("error", "You must be Signedin First!!!");
    return res.redirect("/login");
  }
  next();
};

module.exports = isLoggedIn;
