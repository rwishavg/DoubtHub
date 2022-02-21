const express = require("express");
const router = express.Router();

const {
	addNewComment,
	getComments,
	deleteComment,
} = require("../Controllers/comment");

router.route("/addNewComment").post(addNewComment);
router.route("/delete").post(deleteComment);
router.route("/getComments").get(getComments);

module.exports = router;
