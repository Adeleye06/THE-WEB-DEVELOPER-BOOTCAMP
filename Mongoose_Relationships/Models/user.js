const mongoose = require('mongoose');
mongoose
  .connect("mongodb://127.0.0.1:27017/relationshipDemo")
  .then(() => {
    console.log(" MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO ERROR, MONGO CONNECTION ERROR");
    console.log(err);
  });

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    address: [
        {
            _id: {_id: false},
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async() => {
    const u = new User({
        first: 'Harry',
        last: 'Potter'
    })
    u.address.push({
        street: '123 Sesame St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await u.save();
    console.log(res);
}
const addAddress = async(id) => {
    const user = await User.findById(id);
    user.address.push({
        street: '99 3rd St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await user.save();
    console.log(res);
}
makeUser();

addAddress('64cc3f739af2049b81e56be0');