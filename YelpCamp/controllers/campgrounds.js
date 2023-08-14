const Campground = require('../models/campground');
module.exports.index = async (req, res) => {
    const allCampgrounds = await Campground.find({});
    res.render("campgrounds/index", { allCampgrounds });
}
module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new");
  }