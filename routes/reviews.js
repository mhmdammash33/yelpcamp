const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review");
const Campground = require("../models/campground");
const validateReview = require("../middleware/reviewValidation");
const catchAsync = require("../utilities/catchAsync");
const isLoggedIn = require("../middleware/isLoggedIn");
const isReviewAuthor = require('../middleware/isReviewAuthor')

//NEW: //we placed new form on same page as campground show
//CREATE:
router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const myReview = new Review(req.body.review);
    myReview.author = req.user._id;
    campground.reviews.push(myReview);
    await myReview.save();
    await campground.save();
    req.flash("success", "Review Added Successfully!!");
    res.redirect(`/campgrounds/${id}`);
  })
);

//Delete:
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("error", "Review Deleted!!");
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
