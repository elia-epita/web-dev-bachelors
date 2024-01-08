const router = require("express").Router();

const userServices = require("../services/users.service");

// add our routes

router.post("/register", userServices.register);
router.post("/login", userServices.login);
// PUT -> Edit Password
// POST -> Logout

module.exports = router;
