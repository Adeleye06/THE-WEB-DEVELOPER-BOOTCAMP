const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
    .then(() => {
        console.log('CONNECTION OPEN!!');
    })
    .catch((err) => {
        console.log('OH NO ERROR!!!');
        console.log(err);

    })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [20, 'Maximum length is 20']
    },
    price: {
        type: Number,
        required: true
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: {
        type: [String],
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});

//instance methods are methods made on an instance of that model, 
//so only instances of the model can access such methods 
productSchema.methods.greet = function (){
    console.log("HELLOWWWWW");
    console.log(`- from ${this.name}`);
}

productSchema.methods.toggleOnSale = function (){
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function (newCategory){
    this.categories.push(newCategory);
    return this.save;
}

//this is a static method
//static methods are methods made on the model itself and the instance of 
//such model can't access these methods.
productSchema.statics.fireSale = function (){
    return this.updateMany({}, {onSale: true, price: 0})
}

const Product = mongoose.model('Product', productSchema);


const findProduct = async function (){
    const foundProduct = await Product.findOne({name: 'Bike Helmet'});
    console.log(foundProduct)
    await foundProduct.toggleOnSale();
    console.log(foundProduct)
    await foundProduct.addCategory('Outdoors');
    console.log(foundProduct)
}
Product.fireSale().then((m) => console.log(m));
/* findProduct(); */

/* const bike = new Product({ name: 'Cycling Jersey', price: 2850, categories: ['Cycling'], size: 'S'})
bike.save()
    .then(data => {
        console.log('IT WORKED!');
        console.log(data);
    })
    .catch(err => {
        console.log('OH NO ERROR')
        console.log(err);
    })  */

/** Product.findOneAndUpdate({name: 'Tire Pump'}, {price: 100}, {new: true, runValidators: true})
    .then(data => {
        console.log('IT WORKED!');
        console.log(data);
    })
    .catch(err => {
        console.log('OH NO ERROR')
        console.log(err);
    })
    */