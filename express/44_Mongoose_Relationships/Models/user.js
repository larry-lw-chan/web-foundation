// 1) Import mongoose and connect to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/relationship-demo')
    .then(() => { 
        console.log("Database connected")
    })
    .catch((err) => {
        console.log("Connection Error");
        console.log(err);
    });

const db = mongoose.connection;

// 2) Create UserSchema
const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: {
                id: false,
            },
            street: {
                type: String,
                require: true,
            },
            city: {
                type: String,
                require: true,
            },
            state: {
                type: String,
                require: true,
            },
            country: {
                type: String,
                require: true,
            }
        }
    ],
});

// 3) Create UserSchema
const User = mongoose.model('User', userSchema);

// 4) Make User Model and initial seed data
const makeUser = async () => {
    const user = new User({
        first: 'Harry',
        last: 'Potter',
        addresses: [
            {
                street: '123 Sesame Street',
                city: 'New York',
                state: 'NY',
                country: 'USA',
            },
            {
                street: '543 Wework Street',
                city: 'New Jersey',
                state: 'NJ',
                country: 'USA',
            },            
        ]
    });
    const res = await user.save();
    console.log(res);
    db.close();
}

// 5 Example of adding additional address
const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: '543 Katy Street',
        city: 'Atlanta',
        state: 'GA',
        country: 'USA',
    });
    const res = await user.save();
    console.log(res);
}

// makeUser();
let id = '6574947aa5cfaa1546bd5c47';
addAddress(id);

