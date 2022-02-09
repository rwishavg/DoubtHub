const mongoose = require("mongoose");
const { Schema } = mongoose;
const { nanoid } = require("nanoid");
const questionSchema = new Schema({
	questionID: {
		type: String,
		default: nanoid(15),
		required: false,
	},
	username: {
		type: String,
		default: "Name",
		required: false,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
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
module.exports = mongoose.model("question", questionSchema, "questionSchema");
/*
	{
		username: "raghav";
		currentState: true;
	}
*/
