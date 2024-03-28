const bcrypt = require("bcrypt");

// Declare variables
const saltRounds = 12;
const myPlainTextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

// Use bcrypt
// bcrypt.genSalt(saltRounds, function (err, salt) {
//   bcrypt.hash(myPlainTextPassword, salt, function (err, hash) {
//     console.log(hash);
//   });
// });

// bcrypt.hash(myPlainTextPassword, saltRounds, function (err, hash) {
//   // Store hash in your password DB.
//   console.log(hash);
// });

const hashPassword = async (pw) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(pw, salt);
  console.log(salt);
  console.log(hash);
};

const login = async (pw, hashedPw) => {
  const result = await bcrypt.compare(pw, hashedPw);
  if (result) {
    console.log("Logged you in! Success!");
  } else {
    console.log("Incorrect password!");
  }
};

// hashPassword("monkey");
login("monkey", "$2b$12$2BNZY8nEs3Lqx0mKw0HfR.wOQ1VJd4PliJcCiOosucVJQAt3utYpO");
