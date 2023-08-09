const express = require("express");
const path = require("path");
const app = express();
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ExpressError = require("./utilities/ExpressError");
const session = require('express-session');
const flash = require('connect-flash')
const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

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
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
  secret: 'thisshouldbeabettersecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}
app.use(session(sessionConfig));
app.use(flash());
app.use((req, res ,next) => {
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error');
  next();
})

app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);


//default route
app.get("/", (req, res) => {
  res.render("campgrounds/home");
});
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
