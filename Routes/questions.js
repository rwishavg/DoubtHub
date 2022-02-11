const express = require("express");
const router = express.Router();

const {
	addNewQuestion,
	getQuestions,
	deleteQuestion,
} = require("../Controllers/questions");

router.route("/addNewQuestion").post(addNewQuestion);
router.route("/delete").post(deleteQuestion);
router.route("/getQuestions").get(getQuestions);

module.exports = router;
