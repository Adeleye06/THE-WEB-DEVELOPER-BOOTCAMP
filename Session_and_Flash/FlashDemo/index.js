const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const Farm = require('./models/farm')

mongoose
.connect("mongodb://127.0.0.1:27017/flashDemo")
.then(() => {
  console.log(" MONGO CONNECTION OPEN");
})
.catch((err) => {
  console.log("OH NO ERROR, MONGO CONNECTION ERROR");
  console.log(err);
});

const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false }
app.use(session(sessionOptions));
app.use(flash());
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));


// FARM ROUTES

app.use((req, res, next) => {
    res.locals.messages = req.flash('success');
    next();
})

app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms })
})
app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})
app.get('/farms/:id', async (req, res) => {
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('farms/show', { farm })
})

app.post('/farms', async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    req.flash('success', 'Successfully made a new farm!');
    res.redirect('/farms')
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000');
})