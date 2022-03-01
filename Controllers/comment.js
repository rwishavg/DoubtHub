const QuestionSchema = require("../Models/newQuestion");
const User = require("../Models/newUser");
const Comment = require("../Models/newComment");

const { nanoid } = require("nanoid");

exports.addNewComment = async (req, res, next) => {
	try {
		const update = {
			userid: req.body.userid,
			body: req.body.body,
			createdAt: Date.now(),
		};
		let commentResult = await new Comment(update).save();
		const query = { questionID: req.body.questionID };
		const result = await QuestionSchema.findOneAndUpdate(
			query,
			{ $push: { comments: commentResult._id } },
			{ new: true }
		)
			.populate("userid", "username firstName lastName profileIMG")
			.populate("comments", "body createdAt userid")
			.populate({
				path: "comments",
				populate: {
					path: "userid",
					select: "username firstName lastName profileIMG",
				},
			});
		res.status(200).send(result);
		console.log(result);
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

// exports.likeComment = async (req, res, next) => {
// 	try {
// 		const questionData = await QuestionSchema.findOne({
// 			_id: req.body.questionID,
// 		});
// 		var i = questionData.likes.indexOf(req.body.userID);
// 		if (i === -1) {
// 			questionData.likes.push(req.body.userID);
// 			questionData.save();
// 			res.status(200).send({
// 				message: "Liked",
// 				count: questionData.likes.length,
// 			});
// 		} else {
// 			questionData.likes.splice(i, 1);
// 			questionData.save();
// 			res.status(200).send({
// 				message: "Unliked",
// 				count: questionData.likes.length,
// 			});
// 		}
// 	} catch (err) {
// 		res.json(err);
// 	}
// };
