const express = require("express");
const router = express.Router();

const {
	addNewComment,
	getComments,
	deleteComment,
	upvoteComment,
	downvoteComment,
} = require("../Controllers/comment");

router.route("/addNewComment").post(addNewComment);
router.route("/upvoteComment").put(upvoteComment);
router.route("/downvoteComment").put(downvoteComment);
router.route("/delete").delete(deleteComment);

router.route("/getComments").get(getComments);

module.exports = router;
