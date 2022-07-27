const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review");
const Campground = require("../models/campground");
const validateReview = require("../middleware/reviewValidation");
const catchAsync = require("../utilities/catchAsync");
const isLoggedIn = require("../middleware/isLoggedIn");
const isReviewAuthor = require("../middleware/isReviewAuthor");

//Controllers:
const { createReview, deleteReview } = require("../controllers/reviews");

//NEW: //we placed new form on same page as campground show
//CREATE:
router.post("/", isLoggedIn, validateReview, catchAsync(createReview));

//Delete:
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(deleteReview)
);

module.exports = router;
