const dotenv = require("dotenv");
const CommentSchema = require("../Models/newComment");
const QuestionSchema = require("../Models/newQuestion");
const User = require("../Models/newUser");

const { nanoid } = require("nanoid");

dotenv.config({
	path: "./utils/config.env",
});

let host = "";
if (process.env.NODE_ENV === "development") {
	host = "http://localhost:3000";
}

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
			)
			.exec((err, data) => {
				res.send(data);
			});
	} catch (err) {
		res.json(err);
	}
};

exports.getComments = async (req, res, next) => {
	try {
		CommentSchema.find()
			.populate("userid", "username firstName lastName profileIMG")
			.sort({ createdAt: -1 })
			.exec((err, questions) => {
				res.send(questions);
			});
	} catch (err) {
		res.json(err);
	}
};

exports.deleteComment = async (req, res, next) => {
	try {
		await CommentSchema.deleteOne({ _id: req.body.id });
		res.send("Deleted");
	} catch (err) {
		res.json(err);
	}
};
