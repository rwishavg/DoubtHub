const passport = require("passport");
const dotenv = require("dotenv");
const QuestionSchema = require("../Models/newQuestion");

dotenv.config({
	path: "./utils/config.env",
});

let host = "";
if (process.env.NODE_ENV === "development") {
	host = "http://localhost:3000";
}

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
