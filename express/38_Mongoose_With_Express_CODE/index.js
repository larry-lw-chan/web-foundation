// Load Moongoose
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand',  { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => console.log("Mongo Connection Open"))
        .catch((err) => {
            console.log("Connection Error Detected...");
            console.log(err);
        });

// Load Express and Dependencies into Project
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: true }));   // Parse form data in POST request body:
app.use(express.json());                           // To parse incoming JSON in POST request body:
app.use(methodOverride('_method'));                // To 'fake' put/patch/delete requests:

// // Express settings 
app.set('views', path.join(__dirname, 'views'));   // EJS and Views folder setup:
app.set('view engine', 'ejs');                     // EJS and Views folder setup:

// Hardcore Categories
const categories = ['fruit', 'vegetable', 'dairy'];

// *******************************************
// Product Index - shows all products
// *******************************************
app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find(req.query);
        res.render("products/index.ejs", {products, category})
    } else {
        const products = await Product.find(req.query);
        res.render("products/index.ejs", {products, category: 'All'});
    }
});

// *******************************************
// Product New - Form to create new product
// *******************************************
app.get('/products/new', async (req, res) => {
    res.render("products/new.ejs", {categories});
});

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect('/products');
});

// *******************************************
// Product Update - Update product
// *******************************************
app.get('/products/:id/edit', async (req, res) => {
    let {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit.ejs', { product, categories });
});

app.put('/products/:id', async (req,res) => {
    let {id} = req.params;
    console.log(req.body);
    let product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
});

// *******************************************
// Product Delete - Delete a product
// *******************************************
app.delete('/products/:id', async (req, res) => {
    let {id} = req.params;
    let product = await Product.findByIdAndDelete(id);
    res.redirect('/products/');
});

// *******************************************
// Product Show - Product Detail Page
// *******************************************
app.get('/products/:id', async (req, res) => {
    let {id} = req.params;
    console.log(id);
    const product = await Product.findById(id);
    res.render("products/detail.ejs", {product});
});

// Run Express Server
app.listen(3000,(req, res) => {
    console.log("Server is running");
});