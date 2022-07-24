const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const createCamps = require("./seed");
const bodyParser = require("body-parser");
const ExpressError = require("./utilities/ExpressError");
const catchAsync = require("./utilities/catchAsync");

//Session And Flash
const session = require("express-session");
app.use(
  session({
    secret: "ohyeahsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

const flash = require('connect-flash');
app.use(flash());
app.use((req,res,next)=>{
  res.locals.successFlash = req.flash('success');
  res.locals.errorFlash = req.flash('error');
  next();
})


//Models:
const Campground = require("./models/campground");
const Review = require("./models/review");

//Routes
const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);

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

//Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something Went Wrong!" } = err;
  res.status(statusCode).render("error", { err });
});
app.listen(3000, () => {
  console.log("Serving on port 3000!!");
});
