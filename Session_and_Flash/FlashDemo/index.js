const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');

const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false }
app.use(session(sessionOptions));
app.use(flash());

const Farm = require('./models/farm');

mongoose.connect('mongodb://localhost:27017/flashDemo')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

//FARM ROUTES

app.get('/farms', async(req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', {farms});
  })
  app.get('/farms/new', ( req, res) => {
    res.render('farms/new');
  });
  app.get('/farms/:id', async (req, res) => {
    const farm = await Farm.findById(req.params.id)
      .populate('products');
  
    
    res.render('farms/show', {farm});
  })
  
  app.post('/farms', async(req, res) => {
    const newFarm = new Farm(req.body);
    await newFarm.save();
    res.redirect('/farms');
  });
  
  app.get('/farms/:id/products/new', async (req, res) => {
    const {id} = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', {categories, farm});
  })
  
  app.post('/farms/:id/products', async(req, res) => {
    const {id} = req.params;
    const farm = await Farm.findById(id);
    const {name, price , category} = req.body;
    const newProduct = new Product({name, price, category});
    farm.products.push(newProduct);
    newProduct.farm = farm;
  
    await farm.save();
    await newProduct.save();
    res.redirect(`/farms/${id}`);
  })
  
  app.delete('/farms/:id', async(req, res) => {
    const {id} = req.params;
    const deletedFarm = await Farm.findByIdAndDelete(id);
    
    res.redirect('/farms');
  })
app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})