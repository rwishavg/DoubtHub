const express = require("express");
const router = express.Router();

const {
	addNewQuestion,
	getQuestions,
	deleteQuestion,
	saveQuestion,
	myQuestions,
	getSavedQuestions,
	getQuestionPages,
	likeQuestion,
	banQuestion,
	updateQuestion,
} = require("../Controllers/questions");

router.route("/getQuestions").get(getQuestions);
router.route("/getQuestionPages/:id").get(getQuestionPages);
router.route("/myQuestions/:id").get(myQuestions);
router.route("/getSavedQuestions/:id").get(getSavedQuestions);

router.route("/addNewQuestion").post(addNewQuestion);
router.route("/delete").delete(deleteQuestion);
router.route("/saveQuestion").put(saveQuestion);
router.route("/updateQuestion").put(updateQuestion);
router.route("/banQuestion").put(banQuestion);
router.route("/likeQuestion").put(likeQuestion);

module.exports = router;
