const router = require("express").Router();

const movieServices = require("../services/movies.service");

router.get("/", movieServices.getMovies);
router.get("/top", movieServices.getTopRatedMovies);
router.get("/me", movieServices.getSeenMovies);

module.exports = router;
