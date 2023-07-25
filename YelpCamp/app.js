const express = require ('express');
const path = require ('path');
const app = express();
const Campground = require('./models/campground')
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log(" MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO ERROR, MONGO CONNECTION ERROR");
    console.log(err);
  });


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.get('/', (req, res) => {
    res.render('campgrounds/home')
})

app.get('/campgrounds', async (req, res) => {
  const allCampgrounds = await Campground.find({});
  res.render('campgrounds/index', {allCampgrounds});
});

app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new')
})

app.post('/campgrounds', async(req, res) => {
  const newCampground = new Campground(req.body.campground);
  await newCampground.save();
  res.redirect(`/campgrounds/${newCampground._id}`);
})
app.get('/campgrounds/:id', async(req, res) => {
  const {id} = req.params;
  const foundCampground = await Campground.findById(id);
  res.render('campgrounds/show', {foundCampground});
});



app.listen(3000, () => {
    console.log('Serving at port 3000');
})