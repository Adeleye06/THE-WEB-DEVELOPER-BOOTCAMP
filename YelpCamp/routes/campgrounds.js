const express = require('express');
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError");
const Campground = require("../models/campground");
const {campgroundSchema} = require('../schemas');

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(msg, 400);
    }else{
      next();
    }
  }

//route to serve the form for a new campground
router.get("/new", (req, res) => {
    res.render("campgrounds/new");
  });
  
  //route to access all campgrounds
  router.get("/", catchAsync(async (req, res) => {
      const allCampgrounds = await Campground.find({});
      res.render("campgrounds/index", { allCampgrounds });
    })
  );
  
  //route that adds the new campground to the database
  router.post("/",validateCampground, catchAsync(async (req, res, next) => {
      const newCampground = new Campground(req.body.campground);
      await newCampground.save();
      req.flash('success', 'Successfully made a new campground');
      res.redirect(`/campgrounds/${newCampground._id}`);
    })
  );
  
  router.get("/:id", catchAsync(async (req, res) => {
      const { id } = req.params;
      const foundCampground = await Campground.findById(id).populate('reviews');
      if(!foundCampground){
        req.flash('error', 'Cannot find that campground')
        return res.redirect('/campgrounds');
      }
      res.render("campgrounds/show", { foundCampground });
    })
  );
  
  //this route serves the form in order for user to edit
  router.get("/:id/edit", catchAsync(async (req, res) => {
      const { id } = req.params;
      const foundCampground = await Campground.findById(id);
      res.render("campgrounds/edit", { foundCampground });
    })
  );
  
  //this route is to execute the PUT request from the form
  router.put( "/:id", validateCampground, catchAsync(async (req, res) => {
      const { id } = req.params;
      const updatedCampground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
      req.flash('success', 'Successfully updated campground!');
      res.redirect(`/campgrounds/${updatedCampground._id}`);
  }));
  
  //route to delete any campground
  router.delete("/:id", catchAsync(async (req, res) => {
      const { id } = req.params;
      const deletedCampground = await Campground.findByIdAndDelete(id);
      req.flash('success', 'Successfully deleted campground!');
      res.redirect("/campgrounds");
    }));
  

    module.exports = router;