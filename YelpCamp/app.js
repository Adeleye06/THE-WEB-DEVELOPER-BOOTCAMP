const express = require("express");
const path = require("path");
const app = express();
const ejsMate = require("ejs-mate");
const Campground = require("./models/campground");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const catchAsync = require("./utilities/catchAsync");
const ExpressError = require("./utilities/ExpressError");
const {campgroundSchema} = require('./schemas')
mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log(" MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO ERROR, MONGO CONNECTION ERROR");
    console.log(err);
  });

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//to parse the req.body
app.use(express.urlencoded({ extended: true }));

//in order override the POST requests to whatever request needed
app.use(methodOverride("_method"));

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }else{
    next();
  }
}

//default route
app.get("/", (req, res) => {
  res.render("campgrounds/home");
});


//route to serve the form for a new campground
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

//route to access all campgrounds
app.get("/campgrounds", catchAsync(async (req, res) => {
    const allCampgrounds = await Campground.find({});
    res.render("campgrounds/index", { allCampgrounds });
  })
);

//route that adds the new campground to the database
app.post("/campgrounds",validateCampground, catchAsync(async (req, res, next) => {
    const newCampground = new Campground(req.body.campground);
    await newCampground.save();
    res.redirect(`/campgrounds/${newCampground._id}`);
  })
);

app.get("/campgrounds/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const foundCampground = await Campground.findById(id);
    res.render("campgrounds/show", { foundCampground });
  })
);

//this route serves the form in order for user to edit
app.get("/campgrounds/:id/edit", catchAsync(async (req, res) => {
    const { id } = req.params;
    const foundCampground = await Campground.findById(id);
    res.render("campgrounds/edit", { foundCampground });
  })
);

//this route is to execute the PUT request from the form
app.put( "/campgrounds/:id", validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedCampground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${updatedCampground._id}`);
}));

//route to delete any campground
app.delete("/campgrounds/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedCampground = await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  }));

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});
//error handling middleware
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});
app.listen(3000, () => {
  console.log("Serving at port 3000");
});
