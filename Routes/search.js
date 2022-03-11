const express = require("express");
const router = express.Router();

const { name, username, tag, question } = require("../Controllers/search");

router.route("/name/:id").get(name);
router.route("/tag/:id").get(tag);
router.route("/username/:id").get(username);
router.route("/question/:id").get(question);
// router.route("/all/:pages").get(getQuestions);
// router.route("/tags/:id").get(getQuestionPages);
// router.route("/username/:id").get(myQuestions);

module.exports = router;
