const express = require('express');
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const campgrounds = require('../controllers/campgrounds')

router.route('/')
  //route to access all campgrounds
  .get(catchAsync(campgrounds.index))
  //route that adds new campgrounds to the database
  .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))

//route to serve the form for a new campground
router.get("/new", isLoggedIn,(campgrounds.renderNewForm));

router.route('/:id')
  //route to show a campground
  .get(catchAsync(campgrounds.showCampground))
  //route that updates a campground
  .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
  //route that deletes the campground
  .delete(isAuthor, catchAsync(campgrounds.deleteCampground))

//this route serves the form in order for user to edit
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditCampground));

module.exports = router;