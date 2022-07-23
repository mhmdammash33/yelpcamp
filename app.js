const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const createCamps = require("./seed");
const bodyParser = require("body-parser");
const ExpressError = require("./utilities/ExpressError");
const catchAsync = require("./utilities/catchAsync");
const validateCampground = require("./middleware/campgroundValidation");
const validateReview = require("./middleware/reviewValidation");

//Models:
const Campground = require("./models/campground");
const Review = require("./models/review");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));

mongoose
  .connect("mongodb://localhost:27017/yelpcamp_db")
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));

//seeding my db
const seedDB = catchAsync(async () => {
  await Campground.deleteMany({});
  createCamps();
});
seedDB();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

//--------CAMPGROUND ROUTES--------------------------

//index page show all
app.get(
  "/campgrounds",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds", { campgrounds });
  })
);

// New and Create
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});
app.post(
  "/campgrounds",
  validateCampground,
  catchAsync(async (req, res, next) => {
    const campground = await new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${camp._id}`);
  })
);

//Show Specific Camp
app.get(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate("reviews");
    res.render("campgrounds/show", { campground });
  })
);

//Edit and Update
app.get(
  "/campgrounds/:id/edit",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render(`campgrounds/edit`, { campground });
  })
);
app.patch(
  "/campgrounds/:id",
  validateCampground,
  catchAsync(async (req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, {
      ...req.body.campground,
    });
    res.redirect(`/campgrounds/${req.params.id}`);
  })
);

//Delete Campground
app.delete(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);

//--------REVIEWS ROUTES--------------------------
//NEW: //we placed new form on same page as campground show
//CREATE:
app.post(
  "/campgrounds/:id/reviews",
  validateReview,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const myReview = new Review(req.body.review);
    campground.reviews.push(myReview);
    await myReview.save();
    await campground.save();
    res.redirect(`/campgrounds/${id}`);
  })
);

//Delete:
app.delete(
  "/campgrounds/:id/reviews/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
  })
);


//Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something Went Wrong!" } = err;
  res.status(statusCode).render("error", { err });
});
app.listen(3000, () => {
  console.log("Serving on port 3000!!");
});
