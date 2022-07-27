const Review = require("../models/review");

const isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You have no permission to delete the Review!!");
    res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports = isReviewAuthor;
