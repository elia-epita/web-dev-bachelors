const router = require("express").Router();

const ratingService = require("../services/rating.service");

router.post("/:movieId", ratingService.addRating);

module.exports = router;
