// 1) Import mongoose and connect to database
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

mongoose.connect('mongodb://localhost:27017/relationship-demo', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => { 
        console.log("Database connected")
    })
    .catch((err) => {
        console.log("Connection Error");
        console.log(err);
    });

const db = mongoose.connection;

// 2) Create Product Schema
productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']        
    }
});

// 3) Create Product Model
const Product = mongoose.model('Product', productSchema);

// 4) Seed Product Model
async function seedDB() {
    await Product.insertMany([
        { name: 'Goddess Melon', price: 4.99, season: 'Summer' },
        { name: 'Sugar Baby Watermelon', price: 4.99, season: 'Summer' },
        { name: 'Asparagus', price: 3.99, season: 'Spring' },
    ]);
    db.close();
};

// *********************
// Farm Schema and Model
// *********************
const farmSchema = new Schema({
    name: String,
    city: String,
    products: [
        { type: Schema.Types.ObjectId, ref: 'Product' }
    ]
});

const Farm = mongoose.model('Farm', farmSchema);

// Seed Farm
const makeFarm = async () => {
    const farm = new Farm({
        name: 'Full Belly Farm',
        city: 'Guinda, CA',
    });
    const melon = await Product.findOne({ name: 'Goddess Melon' });
    farm.products.push(melon);
    console.log(farm);
    await farm.save();
    db.close();
}

async function addNewProduct() {
    const farm = await Farm.findOne({name: 'Full Belly Farm'});
    const product = await Product.findOne({ name: 'Asparagus' });
    console.log(farm);
    farm.products.push(product);
    await farm.save();
    console.log(farm);
    db.close();
}

// makeFarm();
// addNewProduct();
// Learn Populate Command
Farm.findOne({name: 'Full Belly Farm'}).then(farm => console.log(farm));

Farm.findOne({name: 'Full Belly Farm'}).populate('products').then(farm => console.log(farm));