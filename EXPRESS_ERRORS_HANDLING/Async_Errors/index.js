const express = require ('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override');
const AppError = require('./AppError');

const categories = ['fruit', 'vegetable', 'dairy'];
mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand2")
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

app.get('/products/:id/edit', async (req, res, next) => {
  const {id} = req.params;
  const foundProduct = await Product.findById(id);
  if(!foundProduct){
    return next(new AppError('Product Not Found', 404));
  }
  res.render('products/edit', {foundProduct, categories});
})
app.get('/products/:id',async (req, res, next) => {
  const {id} = req.params;
  const foundProduct = await Product.findById(id);
  if(!foundProduct){
    return next(new AppError('Product Not Found', 404));
  }
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

app.use((err, req, res , next) =>{
  const {status = 500, message = 'Something went wrong'} = err;
  res.status(status).send(message);

})
app.listen(3000, (req, res) => {
    console.log('LISTENING ON PORT 3000');
})