const mongoose = require('mongoose');
const { Schema } = mongoose;
const Farm = require('./farm')
const ObjectId = mongoose.Schema.Types.ObjectId

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    },
    farm: {
        type: Schema.Types.ObjectId,
        ref: 'Farm'
    }
});


// DELETE ALL ASSOCIATED PRODUCTS FROM FARM AFTER A PRODUCT IS DELETED
productSchema.post('findOneAndDelete', async function (product) {
    console.log("Farm ID is ....");    
    console.log(product.farm);    
    console.log("Product ID is ....");    
    console.log(product._id);    

    const res = await Farm.findOneAndUpdate(
         { _id: product.farm }, 
         { $pull: { "products" : product._id } },
         { new: true }
    );
    console.log(res);
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product; 