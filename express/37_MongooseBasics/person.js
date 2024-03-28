// Mongoose Startup
const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/shopApp',  { useUnifiedTopology: true, useNewUrlParser: true });
}

// Create Model Schema
const personSchema = new mongoose.Schema({
    first: {
        type: String,
        required: true,
    },
    last: {
        type: String,
        required: true,
    },
});

// Create Mongoose Virtuals ()
personSchema.virtual('fullName')
    .get(function() {
        return `${this.first} ${this.last}`;
    })
    .set(function(v) {
        this.first = v.split(" ")[0];
        this.last = v.split(" ")[1];
    });

// Create Mongoose Middleware (pre and post)
personSchema.pre('save', async function() {
    this.first = 'YO';
    this.last = 'MAMA';
    console.log("About to save!");
});

personSchema.post('save', async function() {
    console.log("Done saving!");
});

// Create Model
const Person = mongoose.model('Person', personSchema);

// Create Sample Data
// const person = new Person({
//     first: 'John',
//     last: 'Smith',
// });

// person.save().then((p) => console.log(`${p.fullName} was saved`));