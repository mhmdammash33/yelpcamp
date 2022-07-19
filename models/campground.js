const mongoose = require("mongoose");
const Review = require("./review");

const CampgroundSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
  image: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

CampgroundSchema.post("findOneAndDelete", async function (campground) {
    //delete all reviews where it's id is found in deletedCampground Reviews reference ID
  if (campground.reviews.length) {
    await Review.deleteMany({ _id: { $in: campground.reviews } });
  }
});

const Campground = mongoose.model("Campground", CampgroundSchema);
module.exports = Campground;
