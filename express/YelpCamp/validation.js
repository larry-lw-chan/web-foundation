const ExpressError = require("./utils/ExpressError.js");
const AppError = require("./AppError.js");
const { campgroundSchema, reviewSchema } = require("./schemas.js");

// ********************************************************
// * Express Validations
// ********************************************************

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  console.log(error);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  console.log(error);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports = { validateCampground, validateReview };
