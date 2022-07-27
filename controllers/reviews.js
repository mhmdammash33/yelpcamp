const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  const myReview = new Review(req.body.review);
  myReview.author = req.user._id;
  campground.reviews.push(myReview);
  await myReview.save();
  await campground.save();
  req.flash("success", "Review Added Successfully!!");
  res.redirect(`/campgrounds/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("error", "Review Deleted!!");
  res.redirect(`/campgrounds/${id}`);
};
