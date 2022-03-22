const passport = require("passport");
const dotenv = require("dotenv");
const QuestionSchema = require("../Models/newQuestion");

exports.editQuestion = async (req, res, next) => {
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
