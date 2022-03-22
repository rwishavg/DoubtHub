const passport = require("passport");
const dotenv = require("dotenv");
const CommentSchema = require("../Models/newComment");

exports.editComment = async (req, res, next) => {
	try {
		const update = {
			body: req.body.body,
		};
		const query = { _ID: req.body.id };
		const result = await User.findOneAndUpdate(
			query,
			{ $set: update },
			{ new: true }
		);
		res.send(result);
	} catch (err) {
		res.json(err);
	}
};
