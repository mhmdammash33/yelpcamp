const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review");
const Campground = require("../models/campground");
const validateReview = require("../middleware/reviewValidation");
const catchAsync = require("../utilities/catchAsync");

//NEW: //we placed new form on same page as campground show
//CREATE:
router.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const myReview = new Review(req.body.review);
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
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("error", "Review Deleted!!");
    res.redirect(`/campgrounds/${id}`);
  })
);


module.exports = router;