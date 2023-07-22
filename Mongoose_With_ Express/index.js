const express = require ('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log(" MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO ERROR, MONGO CONNECTION ERROR");
    console.log(err);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/products', async(req, res) => {
    const products = await Product.find({});
    console.log(products);
    res.render('products/index', {products})
})
app.get('/products/:id',async (req, res) => {
  const {id} = req.params;
  const foundProduct = await Product.findById(id);
  console.log(foundProduct);
  res.render('products/show', {foundProduct});
})

app.listen(3000, (req, res) => {
    console.log('LISTENING ON PORT 3000');
})