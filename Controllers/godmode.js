const mongoose = require("mongoose");
const Questions = require("../Models/newQuestion");
const User = require("../Models/newUser");
const Comment = require("../Models/newComment");
const Tag = require("../Models/newTag");
const { Schema } = mongoose;

exports.drop = async (req, res, next) => {
	try {
		await User.collection.drop();
		await Questions.collection.drop();
		await Comment.collection.drop();
		await Tag.collection.drop();
		res.send("Deleted");
	} catch (err) {
		res.json(err);
	}
};
