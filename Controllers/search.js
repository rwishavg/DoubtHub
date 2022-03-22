const QuestionSchema = require("../Models/newQuestion");
const User = require("../Models/newUser");
const Comment = require("../Models/newComment");
const Tag = require("../Models/newTag");
const { nanoid } = require("nanoid");

exports.name = async (req, res, next) => {
	try {
		console.log("name");
		let searchText = new RegExp(req.params.id, "i");
		let query = {
			firstName: { $regex: searchText },
		};
		let userData = await User.find(query).limit(5);
		console.log(userData);
		res.status(200).send(userData);
	} catch (err) {
		res.json(err);
	}
};
exports.username = async (req, res, next) => {
	try {
		console.log("username");
		let searchText = new RegExp(req.params.id, "i");
		let query = {
			username: { $regex: searchText },
		};
		let userData = await User.find(query).limit(5);
		res.status(200).send(userData);
	} catch (err) {
		res.json(err);
	}
};

exports.tag = async (req, res, next) => {
	try {
		console.log(req.params.id);
		let searchText = new RegExp(req.params.id, "i");
		let query = {
			tagName: { $regex: searchText },
		};
		let tagData = await Tag.findOne(query)
			.populate({
				path: "questionID",
				populate: {
					path: "userid",
					select: "username firstName lastName profileIMG",
				},
			})
			.limit(5);
		console.log(tagData.questionID);
		res.status(200).send(tagData.questionID);
	} catch (err) {
		console.log(err);
		res.json(err);
	}
};

exports.question = async (req, res, next) => {
	try {
		let searchText = new RegExp(req.params.id, "i");
		let query = {
			heading: { $regex: searchText },
		};
		let questionData = await QuestionSchema.find(query)
			.populate(
				"userid",
				"username firstName lastName profileIMG emailID"
			)
			.limit(5);
		res.status(200).send(questionData);
	} catch (err) {
		res.json(err);
	}
};
