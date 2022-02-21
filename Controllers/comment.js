const dotenv = require("dotenv");
const CommentSchema = require("../Models/newComment");
const Question = require("../Models/newQuestion");

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
		new CommentSchema({
			body: req.body.body,
			commentID: nanoid(15),
			createdAt: Date.now(),
		}).save((err, result) => {
			// console.log(result);
			res.send(result);
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
