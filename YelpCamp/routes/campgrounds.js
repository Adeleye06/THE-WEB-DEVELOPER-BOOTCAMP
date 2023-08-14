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
  router.post("/", isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
      const newCampground = new Campground(req.body.campground);
      newCampground.author = req.user._id;
      await newCampground.save();
      req.flash('success', 'Successfully made a new campground');
      res.redirect(`/campgrounds/${newCampground._id}`);
    })
  );
  
  router.get("/:id", catchAsync(async (req, res) => {
      const { id } = req.params;
      const foundCampground = await Campground.findById(id).populate({
        path: 'reviews',
        populate: {
          path: 'author'
        }
      }).populate('author');
      console.log(foundCampground);
      if(!foundCampground){
        req.flash('error', 'Cannot find that campground')
        return res.redirect('/campgrounds');
      }
      res.render("campgrounds/show", { foundCampground });
    })
  );
  
  //this route serves the form in order for user to edit
  router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(async (req, res) => {
      const { id } = req.params;
      const foundCampground = await Campground.findById(id);
      if(!foundCampground){
        req.flash('error', 'Cannot find that campground');
        return res.redirect('/campgrounds');
      }
      res.render("campgrounds/edit", { foundCampground });
    })
  );
  
  //this route is to execute the PUT request from the form
  router.put( "/:id", isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
      const { id } = req.params;
      const updatedCampground = await Campground.findByIdAndUpdate(id, {...req.body.campground}); 
      req.flash('success', 'Successfully updated campground!');
      res.redirect(`/campgrounds/${updatedCampground._id}`);
  }));
  
  //route to delete any campground
  router.delete("/:id", isAuthor, catchAsync(async (req, res) => {
      const { id } = req.params;
      const deletedCampground = await Campground.findByIdAndDelete(id);
      req.flash('success', 'Successfully deleted campground!');
      res.redirect("/campgrounds");
    }));
  

    module.exports = router;