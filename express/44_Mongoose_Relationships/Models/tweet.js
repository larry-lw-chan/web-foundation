// 1) Import mongoose and connect to database
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

mongoose.connect('mongodb://localhost:27017/tweeter', { 
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


// Create UserSchema
const userSchema = new mongoose.Schema({
    username: String,
    age: Number
});
// Create User model
const User = mongoose.model('User', userSchema);

// Create TweetSchema
const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

// Create Tweet model
const Tweet = mongoose.model('Tweet', tweetSchema);


// Seed Data
// const makeTweets = async () => {
//     // const user = new User({ username: 'chickenfan99', age: 61 });
//     // await user.save();
//     const user = await User.findOne({ username: 'chickenfan99' })
//     const tweet1 = new Tweet({ text: 'la la la my chickens make noises', likes: 1134 });
//     tweet1.user = user;
//     await tweet1.save();

//     const tweet2 = new Tweet({ text: 'bock bock bock my chickens make noises', likes: 1239 });
//     tweet2.user = user;
//     await tweet2.save();
//     db.close();
// }

// makeTweets();

const findTweet = async () => {
    const t = await Tweet.findOne({}).populate('user');
    console.log(t)
    db.close();
}

findTweet();