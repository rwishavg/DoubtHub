const dotenv = require("dotenv");
const QuestionSchema = require("../Models/newQuestion");
const User = require("../Models/newUser");

const { nanoid } = require("nanoid");

exports.addNewComment = async (req, res, next) => {
	try {
		const update = {
			userid: req.body.userid,
			body: req.body.body,
			createdAt: Date.now(),
		};
		const query = { questionID: req.body.questionID };
		// console.log();
		const result = await QuestionSchema.findOneAndUpdate(
			query,
			{ $push: { comments: update } },
			{ new: true }
		)
			.populate("userid", "username firstName lastName profileIMG")
			.populate(
				"comments.userid",
				"username firstName lastName profileIMG"
			);
		res.status(200).send(result);
	} catch (err) {
		res.json(err);
	}
};

exports.getComments = async (req, res, next) => {
	try {
		res.status(200).send(questions);
	} catch (err) {
		res.json(err);
	}
};

exports.deleteComment = async (req, res, next) => {
	try {
		res.status(200).send("Deleted");
	} catch (err) {
		res.json(err);
	}
};
