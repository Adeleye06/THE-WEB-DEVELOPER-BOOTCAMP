const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require('./review');
mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp" )
  .then(() => {
    console.log(" MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO ERROR, MONGO CONNECTION ERROR");
    console.log(err);
  });

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
    ]
})

CampgroundSchema.post('findOneAndDelete', async function(doc){
  if(doc){
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    })
  }
})
module.exports = mongoose.model('Campground', CampgroundSchema);
