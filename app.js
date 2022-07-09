const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const createCamps = require("./seed");
const bodyParser = require("body-parser");

//Models:
const Campground = require("./models/campground");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose
  .connect("mongodb://localhost:27017/yelpcamp_db")
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));

//seeding my db
const seedDB = async () => {
  await Campground.deleteMany({});
  createCamps();
};
seedDB();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

//--------CAMPGROUND ROUTES--------------------------

//index page show all
app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds", { campgrounds });
});

// New and Create
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});
app.post("/campgrounds", async (req, res) => {
  const camp = await new Campground(req.body.campground);
  await camp.save();
  res.redirect(`/campgrounds/${camp._id}`);
});

//Show Specific Camp
app.get("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/show", { campground });
});

//Edit and Update
app.get("/campgrounds/:id/edit", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render(`campgrounds/edit`, { campground });
});
app.patch("/campgrounds/:id", async (req, res) => {
  await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground });
  res.redirect(`/campgrounds/${req.params.id}`);
});

//Delete Campground
app.delete("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds')
});

app.listen(3000, () => {
  console.log("Serving on port 3000!!");
});
