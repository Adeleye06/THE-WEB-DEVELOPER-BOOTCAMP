const express = require('express');
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const Campground = require("../models/campground");
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const campgrounds = require('../controllers/campgrounds')
//route to serve the form for a new campground
router.get("/new", isLoggedIn,(campgrounds.renderNewForm));
  
//route to access all campgrounds
router.get("/", catchAsync(campgrounds.index));

//route that adds the new campground to the database
router.post("/", isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));;

router.get("/:id", catchAsync(campgrounds.showCampground));

//this route serves the form in order for user to edit
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.editCampground));

//this route is to execute the PUT request from the form
router.put( "/:id", isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));

//route to delete any campground
router.delete("/:id", isAuthor, catchAsync(campgrounds.deleteCampground));
  

  module.exports = router;