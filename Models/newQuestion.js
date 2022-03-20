const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
	questionID: {
		type: String,
		unique: true,
		required: false,
	},
	userid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	createdAt: {
		type: Date,
	},
	heading: {
		type: String,
		required: true,
		default: "THIS IS A QUESTION",
	},
	ban: [String],
	description: {
		type: String,
		default: "THIS IS A QUESTION DESCRIPTION",
	},
	likes: [mongoose.Schema.Types.ObjectId],
	tags: [String],
	comments: {
		// default: undefined,
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
	},
});

module.exports = mongoose.model("question", questionSchema, "Questions");
