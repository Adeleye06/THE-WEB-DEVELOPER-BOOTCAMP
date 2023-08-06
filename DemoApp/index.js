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

//PRODUCT ROUTES
app.get('/products', async(req, res) => {
  const {category} = req.query;
  if(category){
    const products = await Product.find({category: category});
    res.render('products/index', {products, category})
  }else{
    const products = await Product.find({});
    res.render('products/index', {products, category: 'All'})
  }
})

app.get('/products/new', (req, res) => {
  res.render('products/new', {categories});
})

app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id/edit', async (req, res) => {
  const {id} = req.params;
  const foundProduct = await Product.findById(id);
  res.render('products/edit', {foundProduct, categories});
})
app.get('/products/:id',async (req, res) => {
  const {id} = req.params;
  const foundProduct = await Product.findById(id).populate('farm','name');
  res.render('products/show', {foundProduct});
})

app.put('/products/:id', async(req, res) => {
  const {id} = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {runValidators:true, new: true});
  res.redirect(`/products/${updatedProduct._id}`)
})

app.delete('/products/:id', async (req, res) => {
  const {id} = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect('/products');
})
app.listen(3000, (req, res) => {
    console.log('LISTENING ON PORT 3000');
})