// ********************************************************
// * Load mongoose and other dependencies
// ********************************************************
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = Schema({
    body: String,
    rating: Number,
});

module.exports = mongoose.model("Review", ReviewSchema)


