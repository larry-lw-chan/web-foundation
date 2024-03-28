// ********************************************************
// * Load mongoose and other dependencies
// ********************************************************
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const CampgroundSchema = Schema({
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
    ],
});



// DELETE ALL ASSOCIATED PRODUCTS AFTER A FARM IS DELETED
CampgroundSchema.post('findOneAndDelete', async function (campground) {
    console.log("Campground middleware", campground);
    if (campground.reviews.length) {
        const res = await Review.deleteMany({ _id: { $in: campground.reviews } });
        console.log(res);
    }
});

module.exports = mongoose.model('Campground', CampgroundSchema);