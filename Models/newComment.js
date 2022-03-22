const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
	userid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	createdAt: {
		type: Date,
	},
	body: {
		type: String,
		default: "THIS IS A QUESTION DESCRIPTION",
	},
	upvote: [mongoose.Schema.Types.ObjectId],
	downvote: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model("Comment", commentSchema, "Comments");