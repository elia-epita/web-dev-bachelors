const router = require("express").Router();

const profileServices = require("../services/profile.service");

router.put("/", profileServices.editPassword);
// log out

module.exports = router;
