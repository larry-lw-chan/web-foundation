// Mongoose Startup
const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/movieApp',  { useUnifiedTopology: true, useNewUrlParser: true });
}

// Create Models
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema);


// Create Single Records
let amadeus = new Movie({title:'Amadeus', year: 1986, score: 9.2, rating:'R'});
amadeus.save();

// Create Multiple Records at once
Movie.insertMany([
    {title:'Amalie', year: 2001, score: 8.3, rating:'R'},
    {title:'Aliens', year: 1979, score: 8.1, rating:'R'},
    {title:'The Iron Giant', year: 1999, score: 7.5, rating:'PG'},
    {title:'Stand by Me', year: 1986, score: 8.6, rating:'R'},
    {title:'Moonrise Kingdom', year: 2012, score: 7.3, rating:'PG-13'}
]);