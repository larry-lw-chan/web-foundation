// Mongoose Startup
const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/shopApp',  { useUnifiedTopology: true, useNewUrlParser: true });
}

// Create Model Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive ya dodo!']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: {
        type: [String],
        default: ['cycling']
    },
    qty: {
        online: {

        },
        store: {
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

// Create Custom Instance Methods
productSchema.methods.greet = function() {
    console.log('Hello');
    console.log(`-- from ${this.name}`);
}

productSchema.methods.toggleOnSale = function() {
    this.onSale = !this.onSale;
    this.save();
}

// Create Custom Static Methods
productSchema.statics.fireSale = function() {
    return this.updateMany({}, {onSale: true, price: 0});
}

// Create Model with the Schema
const Product = mongoose.model('Product', productSchema);

// Use Instance Method
const findProduct = async () => {
    const foundProduct = await Product.findOne({name: 'Cycling Jersey'});
    console.log(foundProduct);
    foundProduct.toggleOnSale();
}

// findProduct();

Product.fireSale().then(m => console.log(m));



// Start testing DB
// const bike = new Product({
//     name: 'Cycling Jersey',
//     price: 29.50,
//     categories: ['cycling'],
//     size: 'S',
// });

// bike.save()
//     .then(data => {
//         console.log("It worked");
//         console.log(data);})
//     .catch(err => {
//         console.log("ERROR");
//         console.log(err);
//     });

// Product.findOneAndUpdate({name: 'Tire Pump'}, {price: 100}, {new: true, runValidators: true})
//     .then(data => {
//         console.log("It worked");
//         console.log(data);})
//     .catch(err => {
//         console.log("ERROR");
//         console.log(err);
//     });
