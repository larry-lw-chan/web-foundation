const mongoose = require('mongoose');
const Product = require('./models/product');
const Farm = require('./models/farm');
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect('mongodb://localhost:27017/farmStandTake2', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })
// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable',
        farm: ObjectId('657897669dc7a9774d5973ff')
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit',
        farm: ObjectId('657897669dc7a9774d5973ff')
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit',
        farm: ObjectId('657897669dc7a9774d5973ff')
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable',
        farm: ObjectId('657897669dc7a9774d5973ff')
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy',
        farm: ObjectId('657897669dc7a9774d5973ff')
    },
]



async function seed_products() {
    await Product.insertMany(seedProducts)
        .then(res => {
            console.log(res)
        })
        .catch(e => {
            console.log(e)
        })
}


// Insert product into Farm
async function initialize() {
    const farm = await Farm.findOne({_id: ObjectId('657897669dc7a9774d5973ff')});
    const products = await Product.find({});
    for (product of products) {
        // console.log(product);
        farm.products.push(product);
    }
    await farm.save();
}

async function main() {
    await seed_products();
    await initialize();
    await mongoose.connection.close();
}

main();




