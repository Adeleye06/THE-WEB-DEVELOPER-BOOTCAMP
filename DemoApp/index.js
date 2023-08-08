const express = require ('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//MODELS
const Product = require('./models/product');
const Farm = require('./models/farm');

const categories = ['fruit', 'vegetable', 'dairy'];
mongoose
  .connect("mongodb://127.0.0.1:27017/farmStandTake2")
  .then(() => {
    console.log(" MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO ERROR, MONGO CONNECTION ERROR");
    console.log(err);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


//FARM ROUTES

app.get('/farms', async(req, res) => {
  const farms = await Farm.find({});
  res.render('farms/index', {farms});
})




app.listen(3000, (req, res) => {
    console.log('LISTENING ON PORT 3000');
})