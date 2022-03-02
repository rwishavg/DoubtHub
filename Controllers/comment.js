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
			.populate("comments")
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

exports.upvoteComment = async (req, res, next) => {
	try {
		const commentData = await Comment.findOne({
			_id: req.body.commentID,
		});
		var i = commentData.upvote.indexOf(req.body.userID);
		var j = commentData.downvote.indexOf(req.body.userID);
		var message = "";
		if (i === -1 && j === -1) {
			commentData.upvote.push(req.body.userID);
		} else if (i === -1 && j !== -1) {
			commentData.downvote.splice(j, 1);
			commentData.upvote.push(req.body.userID);
		} else if (i !== -1) {
			commentData.upvote.splice(i, 1);
			message = "Upvote Removed";
		} else {
			message = "Error";
		}
		message = "Up Voted";
		var count = commentData.upvote.length - commentData.downvote.length;
		commentData.save();
		console.log("Backend", count, message);
		res.status(200).send({
			message: message,
			count: count,
		});
	} catch (err) {
		console.log(err);
		res.json(err);
	}
};

exports.downvoteComment = async (req, res, next) => {
	try {
		const commentData = await Comment.findOne({
			_id: req.body.commentID,
		});
		var i = commentData.upvote.indexOf(req.body.userID);
		var j = commentData.downvote.indexOf(req.body.userID);
		var message = "";
		if (j === -1 && i === -1) {
			commentData.downvote.push(req.body.userID);
		} else if (j === -1 && i !== -1) {
			commentData.upvote.splice(i, 1);
			commentData.downvote.push(req.body.userID);
		} else if (j !== -1) {
			commentData.downvote.splice(j, 1);
			message = "Downvote Removed";
		}
		else {
			message = "Error";
		}
		message = "Down Voted";
		var count = commentData.upvote.length - commentData.downvote.length;
		commentData.save();
		console.log("Backend", count, message);
		res.status(200).send({
			message: message,
			count: count,
		});
	} catch (err) {
		console.log(err);
		res.json(err);
	}
};
