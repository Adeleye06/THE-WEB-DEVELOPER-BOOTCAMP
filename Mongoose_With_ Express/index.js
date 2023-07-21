const express = require('express')
const app = express();
const path = require('path');
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/shopApp")
  .then(() => {
    console.log(" MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO ERROR, MONGO CONNECTION ERROR");
    console.log(err);
  });


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/dog', (req , res) => {
    res.send('WOOOOF');
})
app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000')
})

