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
	description: {
		type: String,
		default: "THIS IS A QUESTION DESCRIPTION",
	},
	likes: [mongoose.Schema.Types.ObjectId],
	comments: [
		{
			userid: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
			createdAt: {
				type: Date,
			},
			body: {
				type: String,
				default: "Say Something ...",
			},
		},
	],
});

module.exports = mongoose.model("question", questionSchema, "Questions");

/*
	{
		username: "raghav";
		currentState: true;
	}
*/
