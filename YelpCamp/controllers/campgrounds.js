const Campground = require('../models/campground');

module.exports.index = async (req, res) => {
    const allCampgrounds = await Campground.find({});
    res.render("campgrounds/index", { allCampgrounds });
}
module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new");
  }

module.exports.createCampground = async (req, res, next) => {
    const newCampground = new Campground(req.body.campground);
    newCampground.author = req.user._id;
    await newCampground.save();
    req.flash('success', 'Successfully made a new campground');
    res.redirect(`/campgrounds/${newCampground._id}`);
  }

  module.exports.showCampground = async (req, res) => {
    const { id } = req.params;
    const foundCampground = await Campground.findById(id).populate({
      path: 'reviews',
      populate: {
        path: 'author'
      }
    }).populate('author');
    if(!foundCampground){
      req.flash('error', 'Cannot find that campground')
      return res.redirect('/campgrounds');
    }
    res.render("campgrounds/show", { foundCampground });
  }

  module.exports.renderEditCampground = async (req, res) => {
    const { id } = req.params;
    const foundCampground = await Campground.findById(id);
    if(!foundCampground){
      req.flash('error', 'Cannot find that campground');
      return res.redirect('/campgrounds');
    }
    res.render("campgrounds/edit", { foundCampground });
  }

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const updatedCampground = await Campground.findByIdAndUpdate(id, {...req.body.campground}); 
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${updatedCampground._id}`);
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const deletedCampground = await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!');
    res.redirect("/campgrounds");
  }