const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync.js");
const Campground = require("../models/campground");
const validateCampground = require("../middleware/campgroundValidation");
const isLoggedIn = require("../middleware/isLoggedIn");
const isAuthor = require("../middleware/isAuthor");

//Controllers:
const {
  findAllCampgrounds,
  renderNewForm,
  showCampground,
  createCampground,
  editCampground,
  updateCampground,
  deleteCampground,
} = require("../controllers/campgrounds");

//index page show all
router.get("/", catchAsync(findAllCampgrounds));

// New and Create
router.get("/new", isLoggedIn, renderNewForm);
router.post("/", isLoggedIn, validateCampground, catchAsync(createCampground));

//Show Specific Camp
router.get("/:id", catchAsync(showCampground));

//Edit and Update
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor, //after making sure we have user, we make sure the user is the owner of this camp
  catchAsync(editCampground)
);

router.patch(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchAsync(updateCampground)
);

//Delete Campground
router.delete("/:id", isLoggedIn, isAuthor, catchAsync(deleteCampground));

module.exports = router;
