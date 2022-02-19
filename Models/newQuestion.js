const mongoose = require("mongoose");
const { Schema } = mongoose;

// const userSchema = require("./newUser");
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
		unique: true,
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
	likes: {
		type: Number,
		unique: false,
		default: 0,
	},
});

module.exports = mongoose.model("question", questionSchema, "Questions");

/*
	{
		username: "raghav";
		currentState: true;
	}
*/
