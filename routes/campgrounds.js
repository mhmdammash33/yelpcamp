const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync.js");
const Campground = require("../models/campground");
const validateCampground = require("../middleware/campgroundValidation");
const isLoggedIn = require("../middleware/authentication/isLoggedIn");

//index page show all
router.get(
  "/",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds", { campgrounds });
  })
);

// New and Create
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});
router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchAsync(async (req, res) => {
    const campground = await new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "Successfully made a new Campground");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

//Show Specific Camp
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate("reviews").populate('author');
    if (!campground) {
      req.flash("error", "Unfound Campground");
      res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
  })
);

//Edit and Update
router.get(
  "/:id/edit",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
      req.flash("error", "campground not found");
      res.redirect("/campgrounds");
    }
    res.render(`campgrounds/edit`, { campground });
  })
);
router.patch(
  "/:id",
  validateCampground,
  isLoggedIn,
  catchAsync(async (req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, {
      ...req.body.campground,
    });
    req.flash("success", "Successfully Updated Campground!!");
    res.redirect(`/campgrounds/${req.params.id}`);
  })
);

//Delete Campground
router.delete(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("error", "Campground Deleted!!");
    res.redirect("/campgrounds");
  })
);

module.exports = router;
