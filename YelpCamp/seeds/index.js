const Campground = require('../models/campground')
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((err) => {
    console.log("CONNECTION ERROR");
    console.log(err);
  });

  //returns a random element in an array e.g array[4]
  const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  }

  //asynchronous function that seeds the database, it deletes everything first 
  //and replaces the data with new sets of data.
  const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
  }

  //seedDB returns a promise therefore it is thenable
  //so i can attach a .then in order to close the database 
  //after it has been seeded.
  seedDB().then(() => {
    mongoose.connection.close();
    console.log('DATABASE CLOSED');
  });