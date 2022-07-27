const Campground = require("../models/campground");

module.exports.findAllCampgrounds = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds", { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

module.exports.createCampground = async (req, res) => {
  const campground = new Campground(req.body.campground);
  campground.author = req.user._id;
  await campground.save();
  req.flash("success", "Successfully made a new Campground");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.showCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("author");
  if (!campground) {
    req.flash("error", "Unfound Campground");
    res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground });
};

module.exports.editCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Cannot find that Campground");
    return res.redirect("/campgrounds");
  }
  res.render(`campgrounds/edit`, { campground });
};

module.exports.updateCampground = async (req, res) => {
  await Campground.findByIdAndUpdate(req.params.id, {
    ...req.body.campground,
  });
  req.flash("success", "Successfully Updated Campground!!");
  res.redirect(`/campgrounds/${req.params.id}`);
};

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("error", "Campground Deleted!!");
  res.redirect("/campgrounds");
};
