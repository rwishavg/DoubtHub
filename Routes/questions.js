const express = require("express");
const router = express.Router();

const { addNewQuestion, getQuestions } = require("../Controllers/questions");

router.route("/addNewQuestion").post(addNewQuestion);
router.route("/getQuestions").get(getQuestions);

module.exports = router;
