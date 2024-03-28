// Load Express and Router
const express = require("express");
const router = express.Router();

// Load Utils and Validation
const { validateCampground } = require("../validation");
const catchAsync = require("../utils/catchAsync");

// Load Models
const Campground = require("../models/campground");
const Review = require("../models/review");

// Load Middleware
const { isLoggedIn } = require("../middleware");

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    if (campgrounds) {
      res.render("./campgrounds/index", { campgrounds });
    } else {
      print(campgrounds + "weird");
      throw new AppError("Page unable to load", 404);
    }
  })
);

// New Page
router.get("/new", isLoggedIn, (req, res) => {
  res.render("./campgrounds/new");
});

router.post(
  "/new",
  isLoggedIn,
  validateCampground,
  catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash("success", "Successfully made a new campground!");
    res.redirect("/campgrounds");
  })
);

// Edit Pages
router.get(
  "/:id/edit",
  catchAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    if (campground) {
      res.render("./campgrounds/edit", { campground });
    } else {
      throw new AppError("Campground edit not working", 404);
    }
  })
);

router.put(
  "/:id/",
  validateCampground,
  catchAsync(async (req, res, next) => {
    const { title, location } = req.body.campground;
    const campground = await Campground.findByIdAndUpdate(
      req.params.id,
      req.body.campground
    );
    if (!campground) {
      throw new AppError("Campground update error", 404);
    } else {
      req.flash("success", "Successfully updated campground!");
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  })
);

// Delete Page
router.delete("/:id", async (req, res) => {
  await Campground.findByIdAndDelete(req.params.id);
  req.flash("success", "Successfully deleted campground");
  res.redirect("/campgrounds");
});

// Detail Page
router.get(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate("reviews");
    if (campground) {
      res.render("./campgrounds/show", { campground });
    } else {
      // throw new AppError("Campground not found", 404);
      req.flash("error", "Campground not found");
      return res.redirect("/campgrounds");
    }
  })
);

module.exports = router;
