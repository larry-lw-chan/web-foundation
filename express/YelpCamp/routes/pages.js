// Load Express and Router
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/error", (req, res) => {
  chicken.fly();
});

router.get("/admin", (res, req) => {
  throw new AppError("You are not admin", 403);
});

module.exports = router;

// // Password Check Page
// function verifyPassword(req, res, next) {
//   try {
//     const { password } = req.query;
//     if (password === "chickennugget") {
//       next();
//     } else {
//       // res.send("Password Needed!");
//       throw new AppError("Password required!", 401);
//     }
//   } catch (e) {
//     next(e);
//   }
// }

// app.get("/secret", verifyPassword, (req, res) => {
//   res.send("Correct password entered.  Someimtes I wear headphone in puboic");
// });
