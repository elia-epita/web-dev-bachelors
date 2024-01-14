const router = require("express").Router();

const commentServices = require("../services/comments.service");

router.get("/:movie_id", commentServices.getCommentsById);
router.post("/:movie_id", commentServices.addComment);

module.exports = router;
