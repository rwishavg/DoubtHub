const express = require("express");
const router = express.Router();

const {
	addNewComment,
	getComments,
	deleteComment,
	upvoteComment,
	downvoteComment
} = require("../Controllers/comment");

router.route("/addNewComment").post(addNewComment);
router.route("/upvoteComment").post(upvoteComment);
router.route("/downvoteComment").post(downvoteComment);
router.route("/delete").post(deleteComment);
router.route("/getComments").get(getComments);
router.route("/getComments").get(getComments);

module.exports = router;
